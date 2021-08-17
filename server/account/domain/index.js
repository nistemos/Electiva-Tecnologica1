const service = require('./sequalize/services/services');

module.exports = function() {
    async function connect() {
        return service().connect();
    }
    async function auth(email, password) {
        return service().authUser(email, password);
    }
    async function create(request) {
        return service().create(request);
    }
    async function recover(email) {
        return service().recover(email);
    }
    async function resetPassword(password, token) {
        return service().resetPassword(password, token);
    }
    async function verifyPassword(idUser, password) {
        return service().verifyPassword(idUser, password);
    }
    async function details(id) {
        return service().details(id);
    }
    return {
        connect,
        auth,
        create,
        recover,
        resetPassword,
        verifyPassword,
        details
    };
};