const { getPeopleOptionsService } = require("../../services/people_options/getPeopleOptions.service")

const getPeopleOptionsController = async (req, res) => {
    const { idPeople } = req.params;

    try {
        const peopleOptions = await getPeopleOptionsService(idPeople);

        if (!peopleOptions) {
            return { error: "No fue encontrado datos de esa persona en peopleOptions" };
        }

        return peopleOptions;


    } catch (error) {
        return { error: "Error interno en la busqueda de los peopleOptions" }
    }
}

module.exports = { getPeopleOptionsController };