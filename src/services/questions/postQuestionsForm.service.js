const { TYPE_OF_QUESTION_QAA, TYPE_OF_QUESTION_FAQ } = require('../../constants');
const { Questions } = require('../../db');
const { v4: uuidv4 } = require('uuid'); // Importa la función para generar UUIDs
const validationDataQAA = require('../../utils/validationDataQAA');
const { ServerError } = require('../../errors');

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

    if (!response) {
    }

    validationDataQAA(newQuestionQAA);

    const questions = Questions.create(newQuestionQAA);
    if (!questions) {
      throw new ServerError('Error al crear nueva pregunta');
    }
    return questions;
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
  }

  return { response: 'se resive peticion' };
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
