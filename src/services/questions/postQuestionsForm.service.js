const { TYPE_OF_QUESTION_QAA, TYPE_OF_QUESTION_FAQ } = require('../../constants');
const { Questions } = require('../../db');
const { v4: uuidv4 } = require('uuid'); // Importa la función para generar UUIDs
const validationDataQAA = require('../../utils/validationDataQAA');
const validationDataFAQ = require('../../utils/validationDataFAQ');
const { ServerError, ValidationsError } = require('../../errors');

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

  const idQuestion = uuidv4();

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

    const question = await Questions.create(newQuestionQAA);
    if (!question) {
      throw new ServerError('Error al crear nueva pregunta');
    }
    return { response: 'QAA creada exitosamente' };
  }

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
    const question = await Questions.create(newQuestionFAQ);
    if (!question) {
      throw new ServerError('Error al crear nueva pregunta');
    }

    const allQuestionsFAQ = await Questions.findAll({
      where: { typeOfQuestion: TYPE_OF_QUESTION_FAQ },
      attributes: {
        exclude: ['response'],
      },
    });

    const questions = {
      count: allQuestionsFAQ.length,
      filter: TYPE_OF_QUESTION_FAQ,
      data: allQuestionsFAQ,
    };

    return { questions };
  }

  return { response: 'El tipo de pregunta no esta definida' };
  //! reclamos y consultas:
  // tipo de cuestion TYPE_OF_QUESTION_QAA *
  // destinatario administrador *
  // receiverMail
  // nombre *
  // senderMail *
  // titulo *
  // mensage *
  // respuesta pendiente

  //! FAQs
  // tipo de cuestion TYPE_OF_QUESTION_FAQ *
  // destinatario cliente o pprovedor o usuario externo *
  // titulo *
  // mensaje *

  //   try {
  //     // Genera un UUID para idQuestion
  //     const idQuestion = uuidv4();

  //     // Crea la pregunta con el UUID generado
  //     const newQuestion = await Questions.create({
  //       idQuestion, // Asigna el UUID generado
  //       typeOfQuestion,
  //       destination,
  //       priority,
  //       senderMail,
  //       fullName,
  //       title,
  //       receiverMail,
  //       message,
  //       response,
  //     });

  //     return newQuestion;
  //   } catch (error) {
  //     console.error('Error creating question:', error);
  //     throw new Error('Internal server error');
  //   }
};

module.exports = postQuestionsService;
