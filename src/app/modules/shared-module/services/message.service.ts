import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message';
import { MessageTypes } from '../enums/enum';

@Injectable()
export class MessageService {

  private messageSource = new Subject<Message>();
  private clearSource = new Subject<number>();

  messageObserver = this.messageSource.asObservable();
  clearObserver = this.clearSource.asObservable();

  add(message: Message): void {
    if (message) {
      this.messageSource.next(message);
    }
  }

  clear(): void {
    this.clearSource.next(MessageTypes.NONE);
  }
}
