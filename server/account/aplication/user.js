const user = require("../domain/index");
//const validate = require("./middlewares/validate");
const got = require('got');

module.exports = function() {
    async function create(request) {
        let errors = [];
        const {
            firstName,
            lastName,
        } = request.body;

        let newUser = {
            firstName,
            lastName,
        };

        /*if (!newUser.confirmationTerms) errors.push('Debes aceptar los terminos y condiciones para poder registrarte');
        if (!validate.validateEmail(newUser.email)) errors.push('El email digitado no es valido');
        if (!validate.validateEmail(newUser.businessEmail)) errors.push('El email empresarial digitado no es valido');
        if (!validate.validateCharacterSpecial(newUser.firstName)) errors.push('No se permiten caracteres especiales en el nombre');
        if (!validate.validateCharacterSpecial(newUser.lastName)) errors.push('No se permiten caracteres especiales en los apellidos');
        if (!validate.validateCharacterSpecial(newUser.businessName)) errors.push('No se permiten caracteres especiales en la razon social');
        if (!validate.validateMinMaxPassword(newUser.password)) errors.push('El password debe tener entre 8 y 100 caracteres.');
        if (!validate.validatePassword(newUser.password)) errors.push('No se permiten caracteres especiales en el password'); */

        if (errors.length > 0) {
            return {
                errors
            };
        } else {
            const response = await user().create(newUser);
            if (response.errors) {
                return response;
            }
            return response;
        }
    }
    async function details(request) {
        const { id } = request.params;
        const response = await user().details(id);
        if (response) {
            return response;
        }
    }
    return {
        create,
        details
    };
};