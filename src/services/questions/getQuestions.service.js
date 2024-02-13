const { TYPE_OF_QUESTION_FAQ, TYPE_OF_QUESTION_QAA } = require('../../constants');
const { Questions } = require('../../db');
const { ValidationsError } = require('../../errors');

const getQuestionsService = async (type) => {
  if (type) {
    if (type === TYPE_OF_QUESTION_FAQ) {
      const allQuestionsFAQ = await Questions.findAll({
        where: { typeOfQuestion: TYPE_OF_QUESTION_FAQ },
        attributes: {
          exclude: ['response', 'priority', 'senderMail', 'fullName', 'receiverMail'],
        },
      });

      const questions = {
        count: allQuestionsFAQ.length,
        filter: { typeOfQuestion: TYPE_OF_QUESTION_FAQ },
        data: allQuestionsFAQ,
      };

      return { questions };
    }

    if (type === TYPE_OF_QUESTION_QAA) {
      const allQuestionsQAA = await Questions.findAll({
        where: { typeOfQuestion: TYPE_OF_QUESTION_QAA },
        attributes: {
          exclude: ['priority'],
        },
      });

      const questions = {
        count: allQuestionsQAA.length,
        filter: { typeOfQuestion: TYPE_OF_QUESTION_QAA },
        data: allQuestionsQAA,
      };

      return { questions };
    }
    throw new ValidationsError(`No hay un tipo de pregunta '${type}' definido`);
  }

  const allQuestions = await Questions.findAll({
    order: [
        ['typeOfQuestion', 'ASC'],
    ],
  });

  const questions = {
    count: allQuestions.length,
    filter: {},
    data: allQuestions,
  };

  return { questions };
};

module.exports = getQuestionsService;
