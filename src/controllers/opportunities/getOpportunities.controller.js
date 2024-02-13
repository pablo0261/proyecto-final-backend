
const { getOpportunitiesService } = require("../../services/opportunities/getOpportunities.service");

const getOpportunitiesController = async (req, res) => {
    try {

        const { opportunities } = await getOpportunitiesService(req.query);
        return res.status(200).json(opportunities);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { getOpportunitiesController }
