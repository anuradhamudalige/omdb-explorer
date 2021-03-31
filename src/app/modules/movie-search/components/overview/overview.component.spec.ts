import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { OmdbService } from '../../services/omdb.service';
import { OmdbServiceMock } from '../../services/omdb.service.spec';
import { SharedModule } from '../../../shared-module/shared.module';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let omdbServiceMock: OmdbServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ OverviewComponent, ToolBarComponent ],
      providers: [
        { provide: OmdbService, useClass: OmdbServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    omdbServiceMock = fixture.debugElement.injector.get(OmdbService) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the initial welcome message', () => {
    expect(fixture.nativeElement.getElementsByTagName('app-message').length).toEqual(1);
    expect(fixture.nativeElement.getElementsByTagName('app-message')[0].innerText).toEqual(
      'Welcome to the OMDB Search, search something in the bar above!'
    );
  });

  it('should both searchCriteria and the searchResults must hold the respected values after onSearch is called', fakeAsync(() => {
    expect(component.searchCriteria).toEqual('');
    expect(component.searchResults).toBeNull();
    component.onSearch('avengers');

    tick();

    expect(component.searchCriteria).toEqual('avengers');
    expect(component.searchResults).toEqual({
      Search: [],
      totalResults: 0,
      Response: 'True',
      Error: ''
    });
  }));

});
