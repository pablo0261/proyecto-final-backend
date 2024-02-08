
const { v4: uuidv4 } = require('uuid');
const { validator } = require("../utils/validator.util");
const { hashPassword } = require("../utils/encrypt.util.js");

const postPeopleUtil = async (params) => {
    let { idPeople, fullName, birthDate, email, password } = params;

    if (!idPeople) idPeople = uuidv4(); 

    params.idPeople = idPeople;

    const errors = validator(params);

    if (Object.keys(errors).length !== 0) {
        return { params: null, errors };
    }

    if (email && password) {
        if (!fullName || !birthDate) {
            return { params: null, errors: { error: "Faltan Datos." } };
        }
        params.password = await hashPassword(password);
    }

    return { params, errors: null };
};

module.exports = { postPeopleUtil };
