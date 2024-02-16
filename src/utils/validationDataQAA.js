const { USER_ADMINISTRATOR } = require('../constants');
const { ValidationsError } = require('../errors');
const REGEX = require('../helpers/regex.helpers');

const validationDataQAA = (data) => {
  const { destination, senderMail, fullName, title, message } = data;

  if (!destination) throw new ValidationsError('Destinatario es requerido');
  if (destination !== USER_ADMINISTRATOR) {
    throw new ValidationsError(`Destinatario debe ser '${USER_ADMINISTRATOR}'`);
  }

  if (!senderMail) throw new ValidationsError('Email de quien envia es requerido');
  if (!REGEX.EMAIL.test(senderMail)) throw new ValidationsError('Email no valido');

  if (!fullName) throw new ValidationsError('Nombre de quien envia es requerido');
  if (!REGEX.SOLO_LETRAS.test(fullName)) {
    throw new ValidationsError('Nombre no valido');
  }

  if (!title) throw new ValidationsError('Titulo es requerido');
  if (!REGEX.LETRAS_CON_NUMEROS.test(title)) throw new ValidationsError('Titulo no valido');
  if (!message) throw new ValidationsError('Mensaje es requerido');
  if (!REGEX.LETRAS_CON_NUMEROS.test(message)) throw new ValidationsError('Mensaje no valido');
};

module.exports = validationDataQAA;
