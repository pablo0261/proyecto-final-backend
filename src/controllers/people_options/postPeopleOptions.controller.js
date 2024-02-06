const postPeopleOptionsService = require('../../services/people_options/postPeopleOptions.service');

const postPeopleOptionsController = async (req, res) => {
  const dataBody = req.body;
  try {
    const { status, result } = await postPeopleOptionsService(dataBody);
    res.status(status).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postPeopleOptionsController;
