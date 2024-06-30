const express = require('express');
const controller = require('./controller');
const verifyToken = require('../../middlewares/auth');

const router = express.Router();

/* GET catalog listing. */
router.route('/').get(verifyToken, controller.index);
router.route('/:id').get(verifyToken, controller.show);

module.exports = router;
