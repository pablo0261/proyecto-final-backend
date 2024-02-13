const { getLandingStatsService } = require("../../services/stats/getLandingStats.service.js");


const getLandingStatsController = async (req, res) => {
    
    try {
        const data = await getLandingStatsService();
        
        if (!data) {
            res.status(400).send("No hay datos disponibles.");
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log("LandingStatsError: ", error);
        res.status(500).send("Error interno del servidor.");
    }
}

module.exports = { getLandingStatsController };