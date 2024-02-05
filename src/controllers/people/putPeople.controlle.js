// birthDate : "1999-10-05"
// email : "alejofunes1@gmail.com"
// fullName : "Alejo"
// password : "AlexisFa23"
// prize: 12
// isProvider: true/false

const { putPeopleService } = require("../../services/people/putPeople.service");

const putPeopleController = async (req, res) => {
    const params = req.body
    const { idPeople } = params

    if (!idPeople) return res.status(400).json({ error: 'Falta el id de la persona' })

    try {
        // const errors = validator(params);

        // if (Object.keys(errors).length !== 0) {
        //     return res.status(400).json(errors);
        // }

        const { result } = await putPeopleService(params)
        return res.status(200).json(result)

    } catch (error) {

        return res.status(500).json({ error: error.message });
    }

};

module.exports = { putPeopleController };