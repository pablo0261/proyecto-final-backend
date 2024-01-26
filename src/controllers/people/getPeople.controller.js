const { getPeopleService } = require("../../services/people/getPeople.service.js");

const getPeopleController = async (req, res) => {
    
    try {
        const people = await getPeopleService(req.query);

        if (!people) {
            return res.status(404).send("No hay registro de personas.");
        }

        return res.status(200).json(people);

    } catch (error) {
        return res.status(500).send(error);

    }

};

module.exports = { getPeopleController };


