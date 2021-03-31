import { Component, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';
import { Message } from '../../models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnDestroy {

  private subscription = new Subscription();
  value: Message | null = null;

  constructor(private messageService: MessageService) {
    this.subscription.add(
      this.messageService.messageObserver.subscribe((message: Message) => {
        this.value = message;
      })
    );

    this.subscription.add(
      this.messageService.clearObserver.subscribe((value: number) => {
        this.value = null;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
