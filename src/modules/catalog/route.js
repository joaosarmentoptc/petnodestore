const express = require('express');
const controller = require('./controller');

const router = express.Router();

/* GET catalog listing. */
router.route('/').get(controller.index);
router.route('/:id').get(controller.show);

module.exports = router;
