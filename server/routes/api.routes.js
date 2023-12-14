const express = require('express');

const router = express.Router();

router.use('/task', require('../controllers/task.controller'));

module.exports = router;
