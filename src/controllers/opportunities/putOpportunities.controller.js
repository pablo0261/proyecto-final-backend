const { putOpportunitiesService } = require("../../services/opportunities/putOpportunities.services");

const putOpportunitiesController = async (req, res) => {

    try {
        const { result} = await putOpportunitiesService(req.body)
        
        return res.status(200).json(result)

    } catch (error) {

        res.status(500).json({ error: error.message });
    }

};

module.exports = { putOpportunitiesController };