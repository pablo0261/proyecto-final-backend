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

const postPeopleController = async (req, res) => {
    const params = req.body
    let { idPeople } = params
    const { fullName, birthDate,
        email, password,
    } = req.body

    if (!idPeople) idPeople = uuidv4() //por si lo cargo desde afuera de la app

    params.idPeople = idPeople

    const errors = validator(params);

    if (email && password) { //si viene mail y password es por que se da de alta
        if (!fullName || !birthDate) { // tiene que venir name y fechanacimiento
            return res.status(400).json({ error: "Faltan Datos" })
        }
    }
    try {
        const { result, created } = await postPeopleService(params)

        console.log("Tiago: ", result.people.count);

        if (created) {
            return res.status(201).json(result)
        }
        return res.status(200).json(result)

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send("Error: Ya existe un registro con el mismo idPeople o email");
        } 
        return res.status(500).send("Error interno del servidor.");
    }

};

module.exports = { postPeopleController };