const { getPeopleOptionsService } = require("../../services/people_options/getPeopleOptions.service")

const getPeopleOptionsController = async (req, res) => {
    const { idPeople } = req.params;

    try {
        const peopleOptions = await getPeopleOptionsService(idPeople);

        if (!peopleOptions) {
            return res.status(404).json({ error: "No se encontraron datos de esa persona en peopleOptions" });
        }

        return res.status(200).json(peopleOptions);

    } catch (error) {
        console.error("Error interno en la búsqueda de los peopleOptions:", error);
        return res.status(500).json({ error: "Error interno en la búsqueda de los peopleOptions" });
    }

}

module.exports = { getPeopleOptionsController };