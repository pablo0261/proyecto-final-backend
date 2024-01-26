const { getProvincesService } = require("../../services/geolocation/getProvinces.service");

const getProvincesController = async (req, res) => {
    try {

        const data = await getProvincesService();

        return res.status(200).json(data);

    } catch (error) {
        res.status(500).send(error);

    }
}

module.exports = { getProvincesController };