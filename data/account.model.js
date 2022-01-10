const sql = require("./account.db");

const Account = function (account) {
    this.id = account.id;
    this.number = account.number;
    this.type = account.type;
    this.initial_balance = account.initial_balance;
    this.balance = account.balance;
    this.description = account.description;
}

Account.findAll = () => {
    return new Promise(data => {
        sql.query("SELECT * FROM account", (err, result) => {
            if (err) throw err;
            data(result);
        })
    })
}

Account.add = (number, type, initial_balance, balance, description) => {
    console.log("log in accmodel")
    console.log(number, type, initial_balance, balance, description)

    let values = [
        number, type, Number(initial_balance), Number(balance), description
    ];
    return new Promise(data => {
        sql.query("INSERT INTO account(`account`.`number`,`account`.`type`,`account`.`initial_balance`,`account`.`balance`,`account`.`description`) VALUES  (?)", [values], (err, result) => {
            if (err) throw err;
            sql.query("SELECT * FROM account WHERE account.id = LAST_INSERT_ID() LIMIT 1", ((err1, results) => {
                if (err1) throw err;
                data(results)
            }))
        })
    })
}


Account.deleteByNumber = (number) => {
    return new Promise(data => {
        sql.query("DELETE FROM `account` WHERE `account`.`id` NOT IN (SELECT transaction.id_source FROM transaction) AND `account`.`number` = (?)", number, (err, res) => {
            if (err) throw err;
            console.log("INSIDE FIND QUERY TO DEL")
            console.log(res)
            data(res);
        })
    })
}


Account.getAllBalances = () => {
    let response = [];
     return new Promise(data => {
         sql.query("SELECT account.id FROM account", (err, res) => {
             let step = 0;
             res.forEach(accountId => {
                 let id = accountId.id;
                 let allData = {};
                 sql.query("SELECT initial_balance FROM account WHERE account.id = (?)", id, (err1, res1) => {
                     sql.query("SELECT SUM(amount) FROM transaction WHERE transaction.id_destination = (?)", id, (err2, res2) => {
                         sql.query("SELECT SUM(amount) FROM transaction WHERE transaction.id_source = (?)", id, (err3, res3) => {
                             sql.query("SELECT account.number FROM account WHERE account.id = (?)", id, (err4, res4) => {
                                 allData.number = res4[0].number;
                                 allData.initial_balance = res1[0].initial_balance;
                                 allData.received_amount = res2[0]['SUM(amount)'];
                                 allData.sent_amount = res3[0]['SUM(amount)'];

                                 let length = res.length;

                                 response.push(allData);
                                 step++;
                                 if (step === length){
                                     data(response);
                                 }
                             })
                         })
                     })
                 })
             })

          })
     })
}

Account.findMostTransactions = () => {
    return new Promise(data => {
        let countMap = new Map;
        let response = {};
        sql.query("SELECT `account`.`id` FROM `account`", (err, res) => {
            console.log("FIND MOST : ");

            console.log(res);
            res.forEach(id => {
                const accountId = id.id;

                console.log(accountId);
                sql.query("SELECT COUNT(`transaction`.`id`) FROM `transaction` WHERE `transaction`.`id_source` = (?) OR `transaction`.`id_destination` = (?)", [accountId, accountId], (err1, res1) => {
                    console.log("AFTER GETTING IDS")
                    console.log(res1)

                    countMap.set(accountId,res1['COUNT(`transaction`.`id`)']);


                    console.log("AFTER SAVING TO MAP");
                    console.log(countMap)

                    let maxEntry = [...countMap.entries()].reduce((accumulator, element) => element[1] > accumulator[1] ? element : accumulator);

                    console.log(maxEntry);

                    sql.query("SELECT * FROM account WHERE account.id = (?)", maxEntry[0], (err2, res2) => {
                        console.log(res2);
                        response.count = maxEntry[1];
                        response.entries = res2;
                        data(response);
                    })

                })
            })

        })
    })
}


module.exports = Account