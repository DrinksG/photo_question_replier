export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(private msg: string) {
    super(msg);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): CustomErrorObject[];
}

export interface CustomErrorObject {
  message: string;
  field?: any;
}