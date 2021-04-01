import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarComponent } from './tool-bar.component';
import { MessageService } from '../../../shared-module/services/message.service';

describe('ToolBarComponent', () => {
  let component: ToolBarComponent;
  let fixture: ComponentFixture<ToolBarComponent>;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolBarComponent ],
      providers: [MessageService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    messageService = fixture.debugElement.injector.get(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the messages when proper input is provided', () => {
    spyOn(messageService, 'clear');
    const sub = component.search.subscribe(value => {
      expect(value).toEqual('some_title');
    });

    component.onSearchClicked('some_title');

    expect(messageService.clear).toHaveBeenCalled();
    sub.unsubscribe();
  });

  it('should not clear the messages when proper input is not provided', () => {
    spyOn(messageService, 'clear');
    component.onSearchClicked('');

    expect(messageService.clear).not.toHaveBeenCalled();
  });
});
