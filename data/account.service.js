const accountModel = require("../data/account.model")

exports.findAll = async () => {
    const account = await accountModel.findAll();
    console.log("in controller")
    console.log(account)
    return account;
};

exports.getAllBalances = async () => {
    const account = await accountModel.getAllBalances();
    console.log("all accounts")
    console.log(account)
    return account;


}

exports.getMostTransactions =async () => {
    return await accountModel.findMostTransactions();
}

exports.deleteByNumber = async (number) =>{
    return await accountModel.deleteByNumber(number);
}


exports.add = async ( number,type,initial_balance,balance,description) =>{
    const account = await accountModel.add(number,type,initial_balance,balance,description);
    console.log("in controller")
    console.log(account)
    return account;
}

