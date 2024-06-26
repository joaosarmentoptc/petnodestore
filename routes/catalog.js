var express = require('express');
var router = express.Router();
var json = require('../public/static/products.json');

/* GET catalog listing. */
router.get('/', function (req, res, next) {
    res.send(200, json);
});

module.exports = router;
