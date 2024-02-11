const createQuestion = require("../../services/questions/postQuestionsForm.service");

const postQuestions = async (req, res) => {
  try {
    const {
      typeOfQuestion,
      destination,
      priority,
      senderMail,
      fullName,
      title,
      receiverMail,
      message,
      response,
    } = req.body;

    const newQuestion = await createQuestion(
      typeOfQuestion,
      destination,
      priority,
      senderMail,
      fullName,
      title,
      receiverMail,
      message,
      response
    );

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = postQuestions;