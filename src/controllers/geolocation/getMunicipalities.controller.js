const { getMunicipalitiesService } = require("../../services/geolocation/getMunicipalities.service");

const getMunicipalitiesController = async (req, res) => {

    try {
        const { id, name, idProvince, province } = req.query;
        const data = await getMunicipalitiesService(id, name, idProvince, province);

        if(data) {
            return res.status(200).json(data);
        }

        return res.status(204).send('Municipalidad no encontrada.');

    } catch (error) {
        res.status(500).send("Error interno del servidor.");
    }
}

module.exports = { getMunicipalitiesController };