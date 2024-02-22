const { PEOPLE_STATE_DELETED } = require('../../constants');
const { People, People_logins } = require('../../db');
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
        if(authenticatedPerson.state===PEOPLE_STATE_DELETED){
            throw new Error('Usuario Borrado, no puede loguearse');
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
