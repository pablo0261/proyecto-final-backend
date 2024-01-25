const { getPeopleService } = require("../../services/people/getPeople.service.js");

const getPeopleController = async (req, res) => {
    let consulta
    
    try {
        const people = await getPeopleService(consulta);

        if (!people) {
            return res.status(404).send("No hay registro de personas.");
        }

        return res.status(200).json(people);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor.");

    }

};

module.exports = { getPeopleController };