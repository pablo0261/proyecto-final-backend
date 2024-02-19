const {
  TYPE_OF_QUESTION_QAA,
  QUESTION_STATUS_COMPLETED,
  QUESTION_STATUS_DELETED,
  QUESTION_STATUS_PENDING,
  TYPE_OF_QUESTION_FAQ,
} = require('../../constants');

const { Questions } = require('../../db');
const { ConflictError, notFoundError, ServerError } = require('../../errors');
const getQuestionsService = require('./getQuestions.service');

const deleteQuestionsService = async (idQuestion) => {
  const question = await Questions.findByPk(idQuestion);

  if (!question || question.questionStatus === QUESTION_STATUS_DELETED) {
    throw new notFoundError('No se encontro una pregunta con el id o ya esta eliminada');
  }

  if (question.typeOfQuestion === TYPE_OF_QUESTION_QAA) {
    //
    if (question.questionStatus === QUESTION_STATUS_COMPLETED) {
      question.questionStatus = QUESTION_STATUS_DELETED;
      await question.save();
      const questions = await getQuestionsService({ typeOfQuestion: TYPE_OF_QUESTION_QAA });
      return questions;
    }

    if (question.questionStatus === QUESTION_STATUS_PENDING) {
      throw new ConflictError('La consulta de responderse antes');
    }
  }

  if (question.typeOfQuestion === TYPE_OF_QUESTION_FAQ) {
    await question.destroy();
    const questions = await getQuestionsService({ typeOfQuestion: TYPE_OF_QUESTION_FAQ });
    return questions;
  }

  throw new ServerError('La peticion se recivio pero no hubo ningun criterio a validar');
};

module.exports = deleteQuestionsService;
