export class Message {
  type: number | undefined;
  message: string | undefined;

  constructor(type: number, message: string) {
    this.type = type;
    this.message = message;
  }
}
