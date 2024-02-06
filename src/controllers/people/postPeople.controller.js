// birthDate : "1999-10-05"
// email : "alejofunes1@gmail.com"
// fullName : "Alejo"
// password : "AlexisFa23"
// prize: 12
// isProvider: true/false

//flag con verification si tiene datos completos o no
const { v4: uuidv4 } = require('uuid');
const { postPeopleService } = require('../../services/people/postPeople.service');
const { validator } = require("../../utils/validator.util");
const { hashPassword } = require("../../utils/encrypt.util.js");

const postPeopleController = async (req, res) => {
    const params = req.body
    let { idPeople } = params
    const { fullName, birthDate,
        email, password,
    } = req.body

    if (!idPeople) idPeople = uuidv4() //por si lo cargo desde afuera de la app

    params.idPeople = idPeople;

    const errors = validator(params);

    if (Object.keys(errors).length !== 0) {
        return res.status(400).json(errors);
    }

    if (email && password) { //si viene mail y password es por que se da de alta
        if (!fullName || !birthDate) { // tiene que venir name y fechanacimiento
            return res.status(400).json({ error: "Faltan Datos." })
        }
        // encriptacion de la contraseña
        params.password = await hashPassword(password);

    }


    try {
        const { result, created } = await postPeopleService(params)

        if (created) {
            return res.status(201).json(result)
        }
        return res.status(200).json(result)

    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: "Ya existe un registro con el mismo idPeople o email." });
        }
        return res.status(500).json({ error: "Error interno del servidor." });
    }

};

module.exports = { postPeopleController };