const { USER_ADMINISTRATOR, TYPE_OF_QUESTION_QAA } = require('../constants');
const { ValidationsError } = require('../errors');
const REGEX = require('../helpers/regex.helpers');

const validationDataQAA = (data) => {
  const { typeOfQuestion, destination, senderMail, fullName, title, message } = data;

  if (!typeOfQuestion) throw new ValidationsError('Tipo de pregunta es requerido');
  if (typeOfQuestion !== TYPE_OF_QUESTION_QAA) {
    throw new ValidationsError(`Tipo de pregunta debe ser "${TYPE_OF_QUESTION_QAA}"`);
  }

  if (!destination) throw new ValidationsError('Destinatario es requerido');
  if (destination !== USER_ADMINISTRATOR) {
    throw new ValidationsError(`Destinatario debe ser '${USER_ADMINISTRATOR}'`);
  }

  if (!senderMail) throw new ValidationsError('Email de quien envia es requerido');
  if (!REGEX.EMAIL.test(senderMail)) throw new ValidationsError('Email no valido');

  if (!fullName) throw new ValidationsError('Nombre de quien envia es requerido');
  if (!REGEX.LETRAS_CON_ESPACIOS.test(fullName)) {
    throw new ValidationsError('Nombre no valido');
  }

  if (!title) throw new ValidationsError('Titulo es requerido');
  if (!REGEX.LETRAS_CON_NUMEROS.test(title)) throw new ValidationsError('Titulo no valido');
  if (!message) throw new ValidationsError('Mensaje es requerido');
  if (!REGEX.LETRAS_CON_NUMEROS.test(message)) throw new ValidationsError('Mensaje no valido');
};

module.exports = validationDataQAA;
