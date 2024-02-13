const { getCustomerStatsService } = require("../../services/stats/getCustomerStats.service.js");


const getCustomerStatsController = async (req, res) => {


    try {
        // code
        

        if (data) {
            return res.status(200).json(data);
        }
    } catch (error) {
        console.log("CustomerStatsError: ", error);
        res.status(500).send("Error interno del servidor.");
    }
}

module.exports = { getCustomerStatsController };