export class AppSuccess {
  statusCode: number;
  message: string;
  [key: string]: any; // Allows additional properties

  constructor(
    statusCode: number = 200,
    message: string,
    data: Record<string, any> = {}
  ) {
    this.statusCode = statusCode;
    this.message = message;

    Object.assign(this, data);
  }
}
