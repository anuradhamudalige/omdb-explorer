import { Injectable, Injector } from '@angular/core';
import { HttpConnectionService } from '../../shared-module/services/http-connection.service';
import { Settings } from '../../../configurations/settings';
import { SearchResults } from '../models/search-results';
import { Movie } from '../models/movie';

/**
 * This service provide all the data needs to be rendered
 * on the presentation layer in context of Movies.
 *
 * Use this service to retrieve data from OMDB via REST.
 */
@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  protected connectionService: HttpConnectionService;
  protected OMDB_BASE_URL = `${Settings.BASE_URL}${Settings.API_KEY}`;

  constructor(private injector: Injector) {
    this.connectionService = this.injector.get(HttpConnectionService);
  }

  /**
   * Use this method to search for a movie title
   * Records are limited 10 per OMDB regulations.
   *
   * Use the {@param pageNumber} to indicate more results lot size of 10
   *
   * @param title (Required) search criteria for the data call
   * @param pageNumber (Optional) Default = 1, indicating the first page
   *
   * @return SearchResults as a Promise
   */
  search(title: string, pageNumber: number = 1): Promise<SearchResults> {
    return this.connectionService.get<SearchResults>(`${this.OMDB_BASE_URL}&s=${title}&page=${pageNumber}&plot=full`)
      .toPromise();
  }

  /**
   * Use this method to retrieve information for a given movie such as
   * Title, Year, Plot, Ratings, Poster, Actors.
   *
   * Plot is a brief description about the movie.
   * You will receive Ratings as an Rating[] including
   * 3 movie review sites (IMDB, Rotten Tomatoes and Metacritic)
   *
   * @param id is the IMDB is for the given movie.
   *
   * @return Movie as a Promise
   */
  getById(id: string): Promise<Movie> {
    return this.connectionService.get<Movie>(`${this.OMDB_BASE_URL}&i=${id}`).toPromise();
  }
}
