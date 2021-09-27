let transactionModel = require("../data/transaction.model");

exports.makeTransaction = async (numberOne, numberTwo,number, amount,description)=> {
    console.log("tr details")
    let today = new Date().toISOString().slice(0, 10)
    console.log(numberOne, numberTwo,number, amount,description,today)
    const transaction = await transactionModel.make(numberOne, numberTwo,number, amount,description).catch((err)=>{
        console.log(err)
    });

    console.log("in controller")
    console.log(transaction)
    return transaction;
}