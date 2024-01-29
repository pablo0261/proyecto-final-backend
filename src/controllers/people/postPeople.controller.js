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
    const params=req.body
    let { idPeople } = params
    const { fullName, birthDate,
        email, password,
    } = req.body

    if (!idPeople) idPeople = uuidv4() //por si lo cargo desde afuera de la app

    params.idPeople=idPeople

    const errors = validator(params);

    // if (!fullName ||
    //     !email ||
    //     !password ||
    //     !birthDate)
    //     return res.status(400).json({ error: "Faltan Datos" })
    try {
        const { result, created } = await postPeopleService(params)

        if (created) return res.status(201).json(result)
        return res.status(200).json(result)

    } catch (error) {
        let errorMessage = 'Unknown error';

        if (error) {
            if (error.original && error.original.message) {
                errorMessage = error.original.message;
            } else if (error.errors &&
                Array.isArray(error.errors) &&
                error.errors.length > 0 &&
                error.errors[0].message) {
                errorMessage = error.errors[0].message;
            } else if (error.message) {
                errorMessage = error.message;
            }
        }

        res.status(500).json({ error: errorMessage });
    }

};

module.exports = { postPeopleController };