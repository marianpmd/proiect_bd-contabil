

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

exports.findAllByNumber = async (number) => {
    console.log("tr number");
    console.log(number);
    const transactionRes = await transactionModel.findAllByNumber(number).catch(err=>{
        console.log(err);
    })
    console.log("tr res");
    console.log(transactionRes)
    return transactionRes;
}

exports.findAllByType = async (type)=> {
    const transactionRes = await transactionModel.findAllByType(type).catch(err=>{
        console.log(err);
    })

    console.log("restults of by type : ")
    console.log(transactionRes)

    return transactionRes;
}

exports.findAllBetweenDates = async (date1 , date2) => {
    console.log("tr dates");
    console.log(date1);
    console.log(date2);
    const transactionRes = await transactionModel.findAllBetweenDates(date1,date2).catch(err=>{
        console.log(err);
    })
    console.log("tr res");
    console.log(transactionRes)
    return transactionRes;
}