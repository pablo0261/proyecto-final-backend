const { ConflictError, notFoundError, ServerError } = require('../../errors');
const deleteQuestionsService = require('../../services/questions/deleteQuestions.service');

const deleteQuestionsController = async (req, res) => {
  try {
    const { idQuestion } = req.params;

    const response = await deleteQuestionsService(idQuestion);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof ConflictError) {
      return res.status(409).json({ error: error.message });
    }

    if (error instanceof notFoundError) {
      return res.status(404).json({ error: error.message });
    }

    if (error instanceof ServerError) {
      return res.status(500).json({ error: error.message });
    }

    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = deleteQuestionsController;
