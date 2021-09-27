const sql = require("./account.db");

const Account = function (account){
    this.id = account.id;
    this.number = account.number;
    this.type = account.type;
    this.initial_balance = account.initial_balance;
    this.balance = account.balance;
    this.description = account.description;
}

Account.findAll = ()=>{
    return new Promise(data=>{
        sql.query("SELECT * FROM account",(err,result)=>{
            if (err) throw err;
            data(result);
        })
    })
}

Account.add = (number,type,initial_balance,balance,description)=>{
    console.log("log in accmodel")
    console.log(number,type,initial_balance,balance,description)

    let values = [
        number,type,Number(initial_balance),Number(balance),description
    ];
    return new Promise(data=>{
        sql.query("INSERT INTO account(`account`.`number`,`account`.`type`,`account`.`initial_balance`,`account`.`balance`,`account`.`description`) VALUES  (?)",[values],(err,result)=>{
            if (err) throw err;
            sql.query("SELECT * FROM account WHERE account.id = LAST_INSERT_ID() LIMIT 1",((err1, results) => {
                if (err1) throw err;
                data(results)
            }))
        })
    })
}


module.exports = Account