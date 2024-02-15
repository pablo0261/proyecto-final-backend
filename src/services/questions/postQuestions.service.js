const { TYPE_OF_QUESTION_QAA, TYPE_OF_QUESTION_FAQ } = require('../../constants');
const { Questions } = require('../../db');
const { v4: uuidv4 } = require('uuid'); // Importa la función para generar UUIDs
const validationDataQAA = require('../../utils/validationDataQAA');
const validationDataFAQ = require('../../utils/validationDataFAQ');
const { ServerError, ValidationsError, ConflictError } = require('../../errors');
const REGEX = require('../../helpers/regex.helpers');

const postQuestionsService = async (questionsData) => {
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
  } = questionsData;

  if (!typeOfQuestion) throw new ValidationsError('Tipo de pregunta es requerido');
  if (!REGEX.SOLO_LETRAS.test(typeOfQuestion)) {
    throw new ValidationsError('Tipo de pregunta debe contener solo letras');
  }

  const idQuestion = uuidv4();

  //
  // caso para consultas o reclamos
  if (typeOfQuestion === TYPE_OF_QUESTION_QAA) {
    const newQuestionQAA = {
      idQuestion,
      typeOfQuestion,
      destination,
      receiverMail,
      fullName,
      senderMail,
      title,
      message,
      response,
    };

    validationDataQAA(newQuestionQAA);

    const [question, create] = await Questions.findOrCreate({
      where: { title, message },
      defaults: newQuestionQAA,
    });

    if (!create) throw new ConflictError('La pregunta ya esta en curso');
    if (!question) throw new ServerError('Error al crear nueva pregunta');

    return { response: 'QAA creada exitosamente' };
  }

  //
  // caso para preguntas frecuentes
  if (typeOfQuestion === TYPE_OF_QUESTION_FAQ) {
    const newQuestionFAQ = {
      idQuestion,
      typeOfQuestion,
      destination,
      priority,
      title,
      message,
    };

    validationDataFAQ(newQuestionFAQ);

    const [question, create] = await Questions.findOrCreate({
      where: { title, message },
      defaults: newQuestionFAQ,
    });

    if (!create) throw new ConflictError('La pregunta ya fue creada');
    if (!question) throw new ServerError('Error al crear nueva pregunta');

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

  throw new ValidationsError('El tipo de pregunta no existe');
};

module.exports = postQuestionsService;
