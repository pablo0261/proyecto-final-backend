const { postOpportunitiesService } = require('../../services/opportunities/postOpportunities.services');

const postOpportunitiesController = async (req, res) => {

    try {
        const { result, created } = await postOpportunitiesService(req.body)

        return res.status(created ? 201 : 200).json(result)

    } catch (error) {

        res.status(500).json({ error: error.message });
    }

};

module.exports = { postOpportunitiesController };