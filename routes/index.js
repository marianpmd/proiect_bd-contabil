var express = require('express');
var router = express.Router();
const accountService =     require("../data/account.service")
const transactionService = require("../data/transaction.service")

router.get('/', function(req, res) {
    accountService.findAll()
        .then(data=> {
            res.render('index', { data: data });
        });
});

router.get('/account', function(req, res) {
    res.render("add-account");
});

router.post('/add/account', function(req, res) {
    accountService.add(req.body.number,req.body.type,req.body.initial_balance,req.body.balance,req.body.description)
        .then(data=> {
            res.render('created-account', { data: data });
        });
});

router.get('/transaction', function(req, res) {
    res.render("make-transaction");
});

router.post('/make/transaction', function(req, res) {
    transactionService.makeTransaction(req.body.number1,req.body.number2,req.body.number,req.body.amount,req.body.description)
        .then(data=>{
            accountService.findAll()
                .then(data=> {
                    res.render('index', { data: data });
                });
        }).catch(err=>{
        console.log(err);
    });
});


router.get('/find/transactions', function(req, res) {
    transactionService.findAllByNumber(req.query.number)
        .then(data=>{
            data.forEach(val=>{
                val.date = val.date.toLocaleDateString();
            })
            res.render("view-transactions",{data : data});
        })
});

router.get('/find/transactions/byDate', function(req, res) {
    transactionService.findAllBetweenDates(req.query.date1,req.query.date2)
        .then(data=>{
            data.forEach(val=>{
                val.date = val.date.toLocaleDateString();
            })
            res.render("view-transactions",{data : data});
        })
});


router.get('/show/transactions', function(req, res) {
    res.render("show-transactions");
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