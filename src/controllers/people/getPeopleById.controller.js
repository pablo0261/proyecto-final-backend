const { getPeopleService } = require("../../services/people/getPeople.service.js");

const getPeopleByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const people = await getPeopleByIdService();

        if (!people) {
            return res.status(404).send("No fue encontrado personas de este tipo.");
        }

        return res.status(200).json(people);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor.");

    }

};

module.exports = { getPeopleByIdController };