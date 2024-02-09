const { People, People_logins } = require('../../db');
const { verifyPassword } = require("../../utils/encrypt.util");

const { v4: uuidv4 } = require('uuid');

const loginPeopleService = async (email, password) => {
    // inicio de la comparacion de password
    let passwordValid;

    try {
        const person = await People.findOne({
            where: { email },
        });

        if (!person) {
            return null;
        }

        passwordValid = person.password;

        const compare = await verifyPassword(password, passwordValid);

        if (!compare) {
            return null;
        }

        return compare;

    } catch (error) {
        throw error;
    }
    // final de la comparacion de password


    const people = await People.findOne({
        where: { email, password: passwordValid },
    });

    if (people) {
        const currentDate = new Date();
        const idPeople = people.idPeople;

        people.logged = true;
        await people.save();

        await People_logins.create({
            id: uuidv4(),
            idPeople,
            loginDate: currentDate,
        });
        return idPeople;
    } else {
        return null;
    }
};

module.exports = loginPeopleService;
