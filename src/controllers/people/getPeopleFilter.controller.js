const { getPeopleFilterService } = require("../../services/people/getPeopleFilter.service");


const getPeopleFilterController = async (req, res) => {
    try {
        const people = await getPeopleFilterService(req.query);

        if (!people) {
            return res.status(404).send("No fue encontrado personas de este tipo.");
        }

        return res.status(200).json(people);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor.");
    }
};


module.exports = { getPeopleFilterController };