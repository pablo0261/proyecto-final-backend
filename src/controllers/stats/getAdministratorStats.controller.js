const { getAdministratorStatsService } = require("../../services/stats/getAdministratorStats.service.js");

const getAdministratorStatsController = async (req, res) => {


    try {
        // code


        if (data) {
            return res.status(200).json(data);
        }
    } catch (error) {
        console.log("AdministratorStatsError: ", error);
        res.status(500).send("Error interno del servidor.");
    }
}

module.exports = { getAdministratorStatsController };