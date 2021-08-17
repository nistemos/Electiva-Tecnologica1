require('dotenv').config();
const express = require('express');
const asyncify = require('express-asyncify');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const app = asyncify(express());
const server = http.createServer(app);
const router = require('./infrastructure/index');

app.set('port', process.env.PORT);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ extended: true, limit: '20000mb' }));
app.use(express.urlencoded({ extended: true, limit: '20000mb' }));
app.use('/v1', router);
app.use((req,res,next)=>{
    next();
});

async function init() {
    await server.listen(app.get('port'), () => {
        console.log('server on port', app.get('port'));
    });
}
init();