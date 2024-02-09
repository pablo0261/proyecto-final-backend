// const {
//   getOpportunitiesService,
// } = require("../../services/opportunities/opportunities.service");

const { getOpportunitiesService } = require("../../services/opportunities/getOpportunities.service");

const getOpportunitiesController = async (req, res) => {
    try {

        const { opportunities, status } = await getOpportunitiesService(req.query);

        return res.status(status).json(opportunities);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { getOpportunitiesController }
