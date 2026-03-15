

export class AppError extends Error {
  constructor(messageKey, statusCode = 500) {
    console.log(messageKey);
    
    super(messageKey);
    this.statusCode = statusCode;
  }
}