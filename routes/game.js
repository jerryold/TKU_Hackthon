var express = require('express');
var router = express.Router();
const cryptoRandomString = require('crypto-random-string');

router.get('/', function (req, res) {
    let room_id = req.query.room_id;
    let position = req.query.position;
    if (!room_id) {
        res.redirect('/');
    } else {
        res.render('game', { room_id: room_id, position: position });
    }
});

module.exports = router;
