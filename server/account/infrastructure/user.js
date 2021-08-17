const express = require('express');
const asyncify = require('express-asyncify');
const user = require('../aplication/user');
const router = asyncify(express.Router());

router.post('/create', async(request, response, next) => {
    //const create = await user().create(request);
    response.json({txt:'creado'});
});

router.get('/details/:id', async(request, response, next) => {
    const details = await user().details(request);
    response.json(details);
});

module.exports = router;