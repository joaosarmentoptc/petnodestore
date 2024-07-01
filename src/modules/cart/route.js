const express = require('express');
const controller = require('./controller');

const router = express.Router();

/* GET catalog listing. */
router.route('/').get(controller.show);
router.route('/').put(controller.create);
router.route('/').delete(controller.delete);

module.exports = router;
