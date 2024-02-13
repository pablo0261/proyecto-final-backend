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

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'conflict error';
  }
}

module.exports = {
  ValidationsError,
  ServerError,
  ConflictError,
};
