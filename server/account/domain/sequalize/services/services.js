/* const db = require('../models/config/db');
const User = require('../models/user');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const { sendEmailRecover, sendEmailReset } = require('../helpers/sendEmails');
const makeErrors = require('../helpers/makeErrors');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = function() {
    async function connect() {
        return db.DBConnectMongoose()
            .then(() => {
                console.log('Conectado a mongo');
            }).catch(e => {
                console.log(e);
            });
    }

    async function details(id) {
        let response;
        try {
            const user = await User.findById(id, 'is_active document firstName lastName birthDate city phone email');
            if (!user) {
                response = {
                    "errors": {
                        "id": {
                            "message": "El id no consiste con ningun usuario."
                        }
                    }
                };
                return response;
            }
            response = user;
        } catch (error) {
            response = {
                "errors": {
                    "id - password": {
                        "message": "El password no corresponde al id del usuario"
                    }
                }
            };
        }
        return response;
    }

    async function authUser(email, password) {
        const user = await User.findOne({
            email,
            is_active: true
        });
        if (!user) return;

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return;

        if (user) {
            await User.findByIdAndUpdate(user._id, {
                dateJoin: Date.now()
            });
            return user;
        } else {
            return false;
        }
    }

    async function create(userCreate) {
        let errors = [];
        let response;

        try {
            const emailExist = await User.findOne({
                email: userCreate.email
            });
            if (emailExist) {
                errors.push("Email ya registrado");
                return { errors };
            }
        } catch (error) {
            response = {
                "error": {
                    "email": "Ingresaste un email no valido."
                }
            };
            return response;
        }

        try {
            const documentExist = await User.findOne({
                document: userCreate.document
            });
            if (documentExist) {
                errors.push("Documento de identidad ya registrado");
                return { errors };
            }
        } catch (error) {
            response = {
                "error": {
                    "document": "Ingresaste un documento no valido"
                }
            };
            return response;
        }

        let hashedPassword;
        try {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(userCreate.password, salt);
        } catch (error) {
            response = {
                "error": {
                    "password": "Debes digitar el password"
                }
            };
            return response;
        }

        const newUser = new User({
            firstName: userCreate.firstName,
            lastName: userCreate.lastName,
            typeId: userCreate.typeId,
            document: userCreate.document,
            birthDate: userCreate.birthDate,
            city: userCreate.city,
            phone: userCreate.phone,
            email: userCreate.email,
            password: hashedPassword,
            confirmationTerms: userCreate.confirmationTerms,
            businessName: userCreate.businessName,
            businessPhone: userCreate.businessPhone,
            businessEmail: userCreate.businessEmail
        });
        try {
            response = await newUser.save();
            response = {
                "message": "Registro exitoso.",
                "data": {
                    "registro": "ok"
                }
            };
        } catch (error) {
            response = makeErrors(error.errors);
        }
        return response;
    }

    async function recover(email) {
        let errors = [];

        let userData;
        let response;
        try {
            userData = await User.findOne({
                email
            });
            if (!userData) {
                errors.push("No existe un usuario con ese email");
                return { errors };
            }
        } catch (error) {
            response = {
                "error": {
                    "email": "Debes ingresar un email"
                }
            };
            return response;
        }

        userData.generatePasswordReset();

        await userData.save();

        let sendEmail = sendEmailRecover(userData);

        try {
            await sgMail.send(sendEmail);
            response = {
                "message": "Revisa la bandeja del email, te enviamos una guia con los pasos a seguir."
            };
        } catch (error) {
            response = {
                "error": "Algo salio mal."
            };
        }
        return response;
    }

    async function resetPassword(password, token) {
        let errors = [];

        const userData = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!userData) {
            errors.push("El token de restablecimiento de password no es valido o a caducado");
            return { errors };
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        userData.password = hashedPassword;
        userData.resetPasswordToken = undefined;
        userData.resetPasswordExpires = undefined;

        await userData.save();

        let sendEmail = sendEmailReset(userData);

        let response;
        try {
            await sgMail.send(sendEmail);
            response = {
                "message": "El cambio de password fue satisfactorio"
            };
        } catch (error) {
            response = {
                "error": "Algo salio mal."
            };
        }
        return response;
    }

    async function verifyPassword(idUser, password) {

        let response;
        try {
            const user = await User.find({ _id: idUser });
            if (!user) {
                response = {
                    "errors": {
                        "id": {
                            "message": "El id no consiste con ningun usuario."
                        }
                    }
                };
                return response;
            }

            const validPassword = bcrypt.compareSync(password, user[0].password);
            if (!validPassword) {
                response = {
                    "errors": {
                        "password": {
                            "message": "El password no coincide con el id del usuario."
                        }
                    }
                };
                return response;
            }
            response = { "message": "ok" };
        } catch (error) {
            response = {
                "errors": {
                    "id - password": {
                        "message": "El password no corresponde al id del usuario"
                    }
                }
            };
        }
        return response;
    }

    return {
        connect,
        authUser,
        create,
        recover,
        resetPassword,
        verifyPassword,
        details
    };
}; */