const db = require('../domain/index');

exports.connect = () => {
    db().connect();
};