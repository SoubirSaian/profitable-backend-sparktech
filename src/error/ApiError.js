class ApiError extends Error {
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    }
  }
}

export default ApiError;

/*
  export function ApiError(statusCode,errorMsg){

    return res.status(statusCode).json({error: errorMsg});
  }
*/
