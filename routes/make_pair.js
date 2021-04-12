var express = require('express');
var router = express.Router();
const cryptoRandomString = require('crypto-random-string');

router.get('/', function (req, res) {
    let user_id = req.query.user_id;
    if(!user_id){
        res.redirect('/signin');
    }else{
        res.render('make_pair', { user_id, user_id });
    }
});

router.post('/', function (req, res) {
    let pair_user_id = req.body.pair_user_id
    if (!pair_user_id) {
        //不存在
        res.redirect('/make_pair');
    } else {
        // 配對成功
        let room_id = cryptoRandomString(6);
        if(true){
            res.redirect('/setting?room_id=' + room_id + '&pair_user_id=' + pair_user_id);
        }else{
            res.redirect('/make_pair');
        }
    }
});

module.exports = router;
