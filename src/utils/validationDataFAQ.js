const { USER_CUSTOMER, USER_PROVIDER, USER_EXTERNAL } = require('../constants');
const { ValidationsError } = require('../errors');
const REGEX = require('../helpers/regex.helpers');

const validationDataFAQ = (data) => {
  const { destination, priority, title, message } = data;

  if (!destination) throw new ValidationsError('Destinatario es requerido');
  if (![USER_CUSTOMER, USER_PROVIDER, USER_EXTERNAL].includes(destination)) {
    throw new ValidationsError(
      `Destinatario debe ser '${USER_CUSTOMER}' o '${USER_PROVIDER}' o '${USER_EXTERNAL}'`
    );
  }

  if (priority) {
    if (!REGEX.NUMERO_ENTERO.test(priority))
      throw new ValidationsError('Prioridad debe ser un numero entero');
  }

  if (!title) throw new ValidationsError('Titulo es requerido');
  if (!REGEX.LETRAS_CON_NUMEROS.test(title)) throw new ValidationsError('Titulo no valido');
  if (!message) throw new ValidationsError('Mensaje es requerido');
  if (!REGEX.LETRAS_CON_NUMEROS.test(message)) throw new ValidationsError('Mensaje no valido');
};

module.exports = validationDataFAQ;
