const { putOpportunitiesService } = require("../../services/opportunities/putOpportunities.services");

const putOpportunitiesController = async (req, res) => {

    try {
        const { result, status } = await putOpportunitiesService(req.body)
        
        return res.status(status).json(result)

    } catch (error) {

        res.status(500).json({ error: error.message });
    }

};

module.exports = { putOpportunitiesController };