import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { OmdbService } from '../../../services/omdb.service';
import { OmdbServiceMock } from '../../../services/omdb.service.spec';
import { SearchResult } from '../../../models/search-result';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let omdbServiceMock: OmdbService;

  const stubSummary: SearchResult = {
    Poster: 'some_dummy_poster',
    Year: '2021',
    class: '',
    imdbID: '123654',
    Title: 'some_dummy_title'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieComponent ],
      providers: [
        { provide: OmdbService, useClass: OmdbServiceMock }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    component.summary = stubSummary;
    fixture.detectChanges();

    omdbServiceMock = fixture.debugElement.injector.get(OmdbService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movie onDetailClick and must remove the Details button', fakeAsync(() => {
    component.onDetailClick();

    tick();
    expect(component.isDetailClicked).toBeTruthy();
    expect(component.summary.class).toBe('flex-full expanded');
    expect(component.movie).toEqual({
      Title: '',
      Ratings: [ {Value: '7', Source: 'IMDB'}],
      Actors: 'Keanu Reevs',
      Plot: 'Some dummy plot',
      Year: '2021',
      Poster: 'some_dummy_url'
    });
  }));
});
