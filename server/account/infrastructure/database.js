const db = require('../aplication/database');

exports.connect = () => {
    db.connect();
};