

export class AppError extends Error {
  constructor(messageKey, statusCode = 500) {
    super(messageKey);
    console.log(messageKey);
     
    this.statusCode = statusCode;
  }
}