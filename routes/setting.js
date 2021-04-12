var express = require('express');
var router = express.Router();
const cryptoRandomString = require('crypto-random-string');

router.get('/', function (req, res) {
    let room_id = req.query.room_id;
    let pair_user_id = req.query.pair_user_id;
    if (!room_id) {
        res.redirect('/');
    }else{
        res.render('setting', { room_id:room_id,pair_user_id:pair_user_id});
    }
});

module.exports = router;
