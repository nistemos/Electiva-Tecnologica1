const express = require('express');
const asyncify = require('express-asyncify');
const router = asyncify(express.Router());
//const auth = require('./auth');
const user = require('./user');

//router.use('/auth', auth);
router.use('/user', user);

module.exports = router;