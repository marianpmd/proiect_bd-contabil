var express = require('express');
var router = express.Router();
const accountService =     require("../data/account.service")
const transactionService = require("../data/transaction.service")

router.get('/', function(req, res, next) {
  const queryResult = accountService.findAll()
      .then(data=> {
        res.render('index', { data: data });
      });
});

router.get('/account', function(req, res, next) {
    res.render("add-account");
});

router.post('/add/account', function(req, res, next) {
  const queryResult = accountService.add(req.body.number,req.body.type,req.body.initial_balance,req.body.balance,req.body.description)
      .then(data=> {
        res.render('created-account', { data: data });
      });
});

router.get('/transaction', function(req, res, next) {
    res.render("make-transaction");
});

router.post('/make/transaction', function(req, res, next) {
    const transactionResult = transactionService.makeTransaction(req.body.number1,req.body.number2,req.body.number,req.body.amount,req.body.description)
        .then(data=>{
            console.log(data)
            const queryResult = accountService.findAll()
                .then(data=> {
                res.render('index', { data: data });
            });
        }).catch(err=>{
            console.log(err)
        })
});


module.exports = router;
/*
CREATE DEFINER=`root`@`localhost` TRIGGER `transactions_AFTER_INSERT` AFTER INSERT ON `transaction` FOR EACH ROW BEGIN
	UPDATE `account` SET account.balance = account.balance - NEW.amount
    WHERE account.id = NEW.id_source;
    UPDATE `account` SET account.balance = account.balance + NEW.amount
    WHERE account.id = NEW.id_destination;

END
 */