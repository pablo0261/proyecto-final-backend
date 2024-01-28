const { getMunicipalitiesService } = require("../../services/geolocation/getMunicipalities.service");

const getMunicipalitiesController = async (req, res) => {
    try {
        const { id,name,idProvince,province } = req.query;
        const data = await getMunicipalitiesService(id,name,idProvince,province);
        return res.status(200).json(data);

    } catch (error) {
        //console.log("controller: ", error);
        res.status(500).send(error);

    }
}

module.exports = { getMunicipalitiesController };

