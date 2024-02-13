const { ValidationsError } = require('../../errors');
const getQuestionsService = require('../../services/questions/getQuestions.service');

const getQuestionsController = async (req, res) => {
  try {
    const { type } = req.query;

    const response = await getQuestionsService(type);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof ValidationsError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = getQuestionsController;
