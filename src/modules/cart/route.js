const express = require('express');
const controller = require('./controller');

const router = express.Router();

/* GET catalog listing. */
router.route('/').get(controller.index);
router.route('/').post(controller.cart_add_item);

module.exports = router;
