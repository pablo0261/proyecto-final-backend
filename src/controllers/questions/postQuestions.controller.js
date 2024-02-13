const { ValidationsError, ServerError } = require('../../errors');
const postQuestionsService = require('../../services/questions/postQuestionsForm.service');

const postQuestionsController = async (req, res) => {
  // const {
  //   typeOfQuestion,
  //   destination,
  //   priority,
  //   senderMail,
  //   fullName,
  //   title,
  //   receiverMail,
  //   message,
  //   response,
  // } = req.body;

  // const newQuestion = await createQuestion(
  //   typeOfQuestion,
  //   destination,
  //   priority,
  //   senderMail,
  //   fullName,
  //   title,
  //   receiverMail,
  //   message,
  //   response
  // );
  try {
    const response = await postQuestionsService(req.body);

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof ValidationsError) {
      return res.status(404).json({ error: error.message });
    }

    if (error instanceof ServerError) {
      return res.status(500).json({ error: error.message });
    }

    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = postQuestionsController;
