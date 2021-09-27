const accountModel = require("../data/account.model")

exports.findAll = async () => {
    const account = await accountModel.findAll();
    console.log("in controller")
    console.log(account)
    return account;

};

exports.add = async ( number,type,initial_balance,balance,description) =>{
    const account = await accountModel.add(number,type,initial_balance,balance,description);
    console.log("in controller")
    console.log(account)
    return account;
}

