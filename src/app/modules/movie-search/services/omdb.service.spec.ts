import { TestBed } from '@angular/core/testing';

import { OmdbService } from './omdb.service';
import { SearchResults } from '../models/search-results';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';
import { HttpConnectionService } from '../../shared-module/services/http-connection.service';

describe('OmdbService', () => {
  let service: OmdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpConnectionService, useClass: HttpConnectionServiceMock }
      ]
    });
    service = TestBed.inject(OmdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

export class OmdbServiceMock {
  stubSearchResults = {
    Search: [],
    totalResults: 0,
    Response: 'True',
    Error: ''
  };
  stubMovie: Movie = {
    Title: '',
    Ratings: [ {Value: '7', Source: 'IMDB'}],
    Actors: 'Keanu Reevs',
    Plot: 'Some dummy plot',
    Year: '2021',
    Poster: 'some_dummy_url'
  };

  search(title: string, pageNumber: number = 1): Promise<SearchResults> {
    return of(this.stubSearchResults).toPromise<SearchResults>();
  }

  getById(id: string): Promise<Movie> {
    return of(this.stubMovie).toPromise<Movie>();
  }
}

class HttpConnectionServiceMock {
  get(url: string): Observable<any> {
    return of([]);
  }
}
