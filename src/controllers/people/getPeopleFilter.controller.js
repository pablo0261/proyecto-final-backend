const { getPeopleFilterService } = require("../../services/people/getPeopleFilter.service");


const getPeopleFilterController = async (req, res) => {
    const { typeOfPerson } = req.query;
    console.log('**********',req.query)
    try {
        const people = await getPeopleFilterService(typeOfPerson);

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