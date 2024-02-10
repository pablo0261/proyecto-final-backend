const { People } = require("../db");
const { verifyPassword } = require("../utils/encrypt.util");

const authenticateUser = async (email, password) => {
    try {
        const person = await People.findOne({ where: { email } });

        if (!person) {
            throw new Error('Usuario no encontrado');
        }

        const passwordValid = person.password;
        const compare = await verifyPassword(password, passwordValid);

        if (!compare) {
            throw new Error('Contraseña incorrecta');
        }

        return person;
    } catch (error) {
        throw error;
    }
};

module.exports = { authenticateUser };