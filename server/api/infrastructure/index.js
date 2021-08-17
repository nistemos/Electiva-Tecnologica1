const express = require('express');
const asyncify = require('express-asyncify');
const user = require('./user');
const router = asyncify(express.Router());

router.use('/account', user);

module.exports = router