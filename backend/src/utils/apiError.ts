//this is a class for error handling
export class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public errors: any[];
  public data: any;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    stack?: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
        //capture stack trac help in debugging
      Error.captureStackTrace(this, this.constructor);
    }
  }
}