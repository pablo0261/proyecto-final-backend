const { getProviderStatsService } = require("../../services/stats/getProviderStats.service.js");

const getProviderStatsController = async (req, res) => {
    const {idPeople}=req.query
    try {
        // code
        //if(!idPeople) return res.status(200).json({error:"deberia enviar el idPeople"});
        
        const data = await getProviderStatsService(idPeople)
        if (data) {
            return res.status(200).json(data);
        }

        return res.status(200).json(data);

    } catch (error) {
        console.log("ProviderStatsError: ", error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getProviderStatsController };