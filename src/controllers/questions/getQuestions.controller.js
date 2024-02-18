const { ValidationsError } = require('../../errors');
const getQuestionsService = require('../../services/questions/getQuestions.service');

const getQuestionsController = async (req, res) => {
  try {
    const { typeOfQuestion, senderMail, questionStatus } = req.query;
    const parameters = { typeOfQuestion, senderMail, questionStatus };

    const questionsData = await getQuestionsService(parameters);
    res.status(200).json(questionsData);
  } catch (error) {
    if (error instanceof ValidationsError) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};

module.exports = getQuestionsController;
