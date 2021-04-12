var express = require('express');
var router = express.Router();
const cryptoRandomString = require('crypto-random-string');

router.get('/', function (req, res) {
    res.render('signin');
});

router.post('/', function (req, res) {
    // if (!req.body.name) {
    //     //重複 或 未填入說鞥者名稱
    //     res.redirect('/signin');
    // } else {
        let user_id = cryptoRandomString(5);
        res.cookie("user", req.body.name, { maxAge: 1000 * 60 * 60 * 24 * 30 });
        res.cookie("user_id", user_id, { maxAge: 1000 * 60 * 60 * 24 * 30 });
        res.redirect('/make_pair?user_id=' + user_id);
    // }
});

module.exports = router;
