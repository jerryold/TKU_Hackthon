var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:file_name', function (req, res) {
    let file_name = req.params.file_name;
    res.sendFile(path.join(__dirname + `/../public/images/cats/${file_name}.png`));
});

module.exports = router;
