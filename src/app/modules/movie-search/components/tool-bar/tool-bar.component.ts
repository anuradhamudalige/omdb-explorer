import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { MessageService } from '../../../shared-module/services/message.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html'
})
export class ToolBarComponent {

  @Output()
  search = new EventEmitter();

  protected messageService: MessageService;

  constructor(private injector: Injector) {
    this.messageService = this.injector.get(MessageService);
  }

  onSearchClicked(value: string): void {
    if (value.length > 0) {
      this.search.emit(value);
      this.messageService.clear();
    }
  }

}
