require('dotenv').config();
const express = require('express');
const asyncify = require('express-asyncify');
const http = require('http');
const router = require('./infrastructure/routes');
//const db = require('./infrastructure/database');
const app = asyncify(express());
const server = http.createServer(app);
const morgan = require('morgan');

//db.connect();
app.set('port', process.env.PORT);
app.use(morgan('dev'));
app.use(express.json({ extended: true, limit: '20000mb' }));
app.use(express.urlencoded({ extended: true, limit: '20000mb' }));
app.use('', router);

async function init() {
    await server.listen(app.get('port'), () => {
        console.log('server on port', app.get('port'));
    });
}
init();