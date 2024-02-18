const { ValidationsError, notFoundError } = require('../../errors');
const putQuestionsService = require('../../services/questions/putQuestions.service');

const putQuestionsController = async (req, res) => {
  try {
    const response = await putQuestionsService(req.body);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof ValidationsError) {
      return res.status(400).json({ error: error.message });
    }

    if (error instanceof notFoundError) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = putQuestionsController;
