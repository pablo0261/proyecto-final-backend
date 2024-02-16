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

class notFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'not found error';
  }
}

module.exports = {
  ValidationsError,
  ServerError,
  ConflictError,
  notFoundError,
};
