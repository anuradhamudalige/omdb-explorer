import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message';
import { MessageTypes } from '../enums/enum';

/**
 * This service can use to communicate with the {@class MessageComponent}
 */
@Injectable()
export class MessageService {

  private messageSource = new Subject<Message>();
  private clearSource = new Subject<number>();

  messageObserver = this.messageSource.asObservable();
  clearObserver = this.clearSource.asObservable();

  /**
   * Use this method to pop messages to the presentation layer
   * @param message require 2 parameters
   *        type: {@enum MessageTypes}
   *        message: {@type string}
   */
  add(message: Message): void {
    if (message) {
      this.messageSource.next(message);
    }
  }

  /**
   * Use this method to clear the existing messages
   */
  clear(): void {
    this.clearSource.next(MessageTypes.NONE);
  }
}
