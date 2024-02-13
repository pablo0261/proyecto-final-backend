const { ValidationsError, ServerError, ConflictError } = require('../../errors');
const postQuestionsService = require('../../services/questions/postQuestions.service');

const postQuestionsController = async (req, res) => {
  try {
    const response = await postQuestionsService(req.body);

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof ValidationsError) {
      return res.status(404).json({ error: error.message });
    }

    if (error instanceof ConflictError) {
      return res.status(409).json({ error: error.message });
    }

    if (error instanceof ServerError) {
      return res.status(500).json({ error: error.message });
    }

    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = postQuestionsController;
