var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.cookies.user == null) {
    res.redirect('/chat_signin');
  } else {
    res.render('chat');
  }
});

module.exports = router;
