const { People, People_logins } = require('../../db');
const { verifyPassword } = require("../../utils/encrypt.util");
const { v4: uuidv4 } = require('uuid');

const loginPeopleService = async (authenticatedPerson) => {

    const { email, password } = authenticatedPerson;
    try {

        const authenticatedPerson = await People.findOne({
            where: { email, password },
        });

        if (!authenticatedPerson) {
            throw new Error('Error en la autenticación');
        }

        const currentDate = new Date();
        const idPeople = authenticatedPerson.idPeople;

        authenticatedPerson.logged = true;
        await authenticatedPerson.save();

        await People_logins.create({
            id: uuidv4(),
            idPeople,
            loginDate: currentDate,
        });

        return idPeople;
    } catch (error) {
        throw error;
    }
};

module.exports = loginPeopleService;
