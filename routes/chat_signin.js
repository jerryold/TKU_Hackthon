var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('chat_signin');
});

router.post('/', function (req, res) {
    if (!req.body.name) {
        //不存在
        res.redirect('/chat_signin');
    } else {
        console.log(req.body.name);
        //不存在，取的名字後登入主頁
        res.cookie("user", req.body.name, { maxAge: 1000 * 60 * 60 * 24 * 30 });
        res.redirect('/chat');
    }
});

module.exports = router;
