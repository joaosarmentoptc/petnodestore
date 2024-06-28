const express = require('express');
const controller = require('./controller');

const router = express.Router();

/* GET catalog listing. */
router.route('/').post(controller.register);

module.exports = router;
