const { getProviderStatsService } = require("../../services/stats/getProviderStats.service.js");

const getProviderStatsController = async (req, res) => {

    try {
        // code
        

        if (data) {
            return res.status(200).json(data);
        }
    } catch (error) {
        console.log("ProviderStatsError: ", error);
        res.status(500).send("Error interno del servidor.");
    }
}

module.exports = { getProviderStatsController };