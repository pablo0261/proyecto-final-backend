const { getProvincesService } = require("../../services/geolocation/getProvinces.service");

const getProvincesController = async (req, res) => {
    const { id, name } = req.query
    try {
        const data = await getProvincesService(id, name);

        if (!data) {
            return res.status(404).send('No hay registro de provincias.');
        }

        return res.status(200).json(data);

    } catch (error) {
        res.status(500).send("Error interno del servidor.");
    }
}

module.exports = { getProvincesController };