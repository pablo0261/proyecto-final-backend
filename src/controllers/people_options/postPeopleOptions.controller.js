const postPeopleOptionsService = require('../../services/people_options/postPeopleOptions.service');

const postPeopleOptionsController = async (req, res) => {
  try {
    const dataBody = req.body;

    const { status, response } = await postPeopleOptionsService(dataBody);
    res.status(status).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postPeopleOptionsController;