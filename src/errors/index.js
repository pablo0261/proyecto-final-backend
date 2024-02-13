class ValidationsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'validation error';
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'server error';
  }
}

module.exports = {
  ValidationsError,
  ServerError,
};
