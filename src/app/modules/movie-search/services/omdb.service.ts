import { Injectable, Injector } from '@angular/core';
import { HttpConnectionService } from '../../shared-module/services/http-connection.service';
import { Settings } from '../../../configurations/settings';
import { SearchResults } from '../models/search-results';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  protected connectionService: HttpConnectionService;
  protected OMDB_BASE_URL = `${Settings.BASE_URL}${Settings.API_KEY}`;

  constructor(private injector: Injector) {
    this.connectionService = this.injector.get(HttpConnectionService);
  }

  search(title: string, pageNumber: number = 1): Promise<SearchResults> {
    return this.connectionService.get<SearchResults>(`${this.OMDB_BASE_URL}&s=${title}&page=${pageNumber}&plot=full`)
      .toPromise();

  }

  getById(id: string): Promise<Movie> {
    return this.connectionService.get<Movie>(`${this.OMDB_BASE_URL}&i=${id}`).toPromise();
  }
}
