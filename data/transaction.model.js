const sql = require("./account.db");

const Transaction = function (transaction) {
    this.id = transaction.id;
    this.number = transaction.number;
    this.date = transaction.date;
    this.amount = transaction.amount;
    this.description = transaction.description;
    this.id_source = transaction.id_source;
    this.id_destination = transaction.id_destination;
}

let sender;
let receiver;
let values=[];

function setSenderId(results) {
    console.log("res")
    console.log(results[0].id)
    sender = results[0].id;
}

function setReceiverId(results) {
    console.log("res")
    console.log(results[0].id)
    receiver = results[0].id;
}

Transaction.make = (numberOne, numberTwo, number, amount, description) => {
    let today = new Date().toISOString().slice(0, 10)
    values = [
        Number(number), Number(amount), description,today
    ];

    return new Promise(vals =>{
        sql.query("SELECT account.id FROM account WHERE account.number = (?)",numberTwo,((err, results) => {
            if (err) throw err;
            values = [results[0].id,...values];
            console.log("one vals")
            console.log(values)
        }))
        sql.query("SELECT account.id FROM account WHERE account.number = (?)",numberOne,((err1, results1) => {
            if (err1) throw err1;
            values = [results1[0].id,...values];
            console.log("two vals")
            console.log(values)

            sql.query("INSERT INTO `transaction`(`id_source`,`id_destination`,`number`,`amount`,`description`,`date`) VALUES(?)", [values], (err2, result2) => {
                if (err2) {
                    console.log("asdadasdasdasdasdasdasdsad")
                    throw err2;
                }
                console.log("query done")
                console.log(result2)
                vals(result2)
            })
        }))
        console.log("inn values")
        console.log(values)

    })
}


module.exports = Transaction