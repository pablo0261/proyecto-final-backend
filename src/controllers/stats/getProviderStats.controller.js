const { getProviderStatsService } = require("../../services/stats/getProviderStats.service.js");

const getProviderStatsController = async (req, res) => {

    try {
        const data = await getProviderStatsService();

        if (!data) {
            res.status(400).send("No hay datos disponibles.");
        }

        return res.status(200).json(data);

    } catch (error) {
        console.log("ProviderStatsError: ", error);
        res.status(500).send("Error interno del servidor.");
    }
}

module.exports = { getProviderStatsController };