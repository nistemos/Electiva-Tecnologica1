const got = require('got');
const URL = 'http://localhost:3001/user';

async function create(data) {
    const user = await got.post(`${URL}/create`, {
        json: {
            firstName: data.firstName,
            lastName: data.lastName,
            /* typeId: data.typeId,
            document: data.document,
            birthDate: data.birthDate,
            city: data.city,
            phone: data.phone,
            email: data.email,
            password: data.password,
            confirmationTerms: data.confirmationTerms,
            businessName: data.businessName,
            businessEmail: data.businessEmail,
            businessPhone: data.businessPhone, */
        },
        responseType: 'json'
    });
    return user.body;
}

module.exports = {
    create
};