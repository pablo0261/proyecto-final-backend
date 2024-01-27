const { getMunicipalitiesService } = require("../../services/geolocation/getMunicipalities.service");

const getMunicipalitiesController = async (req, res) => {
    try {
        const { province } = req.params;

        console.log(province);

        const data = await getMunicipalitiesService(province);

        return res.status(200).json(data);

    } catch (error) {
        console.log("controller: ", error);
        res.status(500).send(error);

    }
}

module.exports = { getMunicipalitiesController };

