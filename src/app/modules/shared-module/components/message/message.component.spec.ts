import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { MessageService } from '../../services/message.service';
import { MessageTypes } from '../../enums/enum';
import { Message } from '../../models/message';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      providers: [MessageService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    messageService = fixture.debugElement.injector.get(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive Message when MessageService.add is being called', fakeAsync(() => {
    messageService.add(new Message(MessageTypes.INFO, 'some dummy message'));

    tick();

    expect(component.value).toEqual(new Message(MessageTypes.INFO, 'some dummy message'));
  }));

  it('should clear the existing messages when MessageService.clear is being called', fakeAsync(() => {
    messageService.clear();

    tick();

    expect(component.value).toBeNull();
  }));
});
