const express = require('express');
const controller = require('./controller');

const router = express.Router();

/* GET catalog listing. */
router.route('/register').post(controller.register);
router.route('/login').post(controller.login);

module.exports = router;