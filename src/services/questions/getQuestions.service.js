const {
  TYPE_OF_QUESTION_FAQ,
  TYPE_OF_QUESTION_QAA,
  QUESTION_STATUS_PENDING,
  QUESTION_STATUS_COMPLETED,
  QUESTION_STATUS_DELETED,
} = require('../../constants');

const REGEX = require('../../helpers/regex.helpers');
const { Questions } = require('../../db');
const { ValidationsError } = require('../../errors');
const { Op } = require('sequelize');

const getQuestionsService = async (parameters = {}) => {
  const { typeOfQuestion, senderMail, questionStatus } = parameters;

  // validaciones
  if (![TYPE_OF_QUESTION_FAQ, TYPE_OF_QUESTION_QAA].includes(typeOfQuestion) && typeOfQuestion) {
    throw new ValidationsError(
      `typeOfQuestion debe ser ${TYPE_OF_QUESTION_FAQ} o ${TYPE_OF_QUESTION_QAA}`
    );
  }

  if (![QUESTION_STATUS_PENDING, QUESTION_STATUS_COMPLETED].includes(questionStatus) && questionStatus) {
    throw new ValidationsError(
      `questionStatus debe ser ${QUESTION_STATUS_PENDING} o ${QUESTION_STATUS_COMPLETED}`
    );
  }

  if (!REGEX.EMAIL.test(senderMail) && senderMail) throw new ValidationsError('email no valido');

  // array de filtros
  const filters = Object.entries(parameters).map(([key, value]) => {
    const obj = {};
    if (value) obj[key] = value;
    return obj;
  });

  // Array de orden
  const orderOption = [];
  if (questionStatus === QUESTION_STATUS_PENDING) orderOption.push(['dateMessage', 'DESC']);
  if (questionStatus === QUESTION_STATUS_COMPLETED) orderOption.push(['dateResponse', 'DESC']);
  if (typeOfQuestion === TYPE_OF_QUESTION_FAQ) orderOption.push(['priority', 'ASC']);

  const allQuestions = await Questions.findAll({
    where: {
      [Op.and]: filters,
      questionStatus: { [Op.ne]: QUESTION_STATUS_DELETED },
    },
    order: orderOption,
  });

  const questions = {
    count: allQuestions.length,
    filter: parameters,
    data: allQuestions,
  };

  return { questions };
};

module.exports = getQuestionsService;
