const {
  QUESTION_STATUS_COMPLETED,
  TYPE_OF_QUESTION_FAQ,
  TYPE_OF_QUESTION_QAA,
} = require('../../constants');

const { ValidationsError, notFoundError } = require('../../errors');
const { Questions } = require('../../db');
const getQuestionsService = require('./getQuestions.service');

const putQuestionsService = async (newQuestionsData = {}) => {
  const {
    idQuestion,
    typeOfQuestion,
    destination,
    priority,
    title,
    receiverMail,
    message,
    response, //
  } = newQuestionsData;

  if (!idQuestion) throw new ValidationsError('idQuestions es requerido');
  if (!typeOfQuestion) throw new ValidationsError('typeOfQuestion es requerido');

  const dateResponse = new Date();
  const questionStatus = QUESTION_STATUS_COMPLETED;

  if (typeOfQuestion === TYPE_OF_QUESTION_FAQ) {
    const objQuestionsDataFAQ = {
      destination,
      title,
      message,
      priority,
    };

    // guardamos solo los parametros con valor
    const arrayQuestionsDataFAQ = Object.entries(objQuestionsDataFAQ).filter(([key, value]) => {
      if (value) return true;
    });

    const newQuestionsDataFAQ = Object.fromEntries(arrayQuestionsDataFAQ);

    const [questionsUpdate] = await Questions.update(newQuestionsDataFAQ, {
      where: { idQuestion, typeOfQuestion },
    });

    if (!questionsUpdate)
      throw new notFoundError(`No se encontro pregunta con el id en ${TYPE_OF_QUESTION_FAQ}`);
  }

  if (typeOfQuestion === TYPE_OF_QUESTION_QAA) {
    if (!response) throw new ValidationsError('response no puede esta vacio');

    const newQuestionsDataQAA = {
      dateResponse,
      questionStatus,
      response,
    };

    const [questionsUpdate] = await Questions.update(newQuestionsDataQAA, {
      where: { idQuestion, typeOfQuestion },
    });

    if (!questionsUpdate)
      throw new notFoundError(`No se encontro pregunta con el id en ${TYPE_OF_QUESTION_QAA}`);
  }

  const questionsData = await getQuestionsService({ typeOfQuestion });
  return questionsData;
};

module.exports = putQuestionsService;
