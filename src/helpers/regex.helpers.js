const REGEX = {
  LETRAS_CON_ESPACIOS: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/,
  LETRAS_CON_NUMEROS: /[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ]/,
  EMAIL: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
};

module.exports = REGEX;
