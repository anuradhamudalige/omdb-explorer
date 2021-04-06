import { Component, Injector, Input } from '@angular/core';
import { SearchResult } from '../../../models/search-result';
import { OmdbService } from '../../../services/omdb.service';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['movie.component.scss']
})
export class MovieComponent {

  @Input()
  summary!: SearchResult;

  movie: Movie | undefined = undefined;
  isDetailClicked = false;
  showDefaultImg = true;

  protected omdbService: OmdbService;

  constructor(private injector: Injector) {
    this.omdbService = this.injector.get(OmdbService);
  }

  onDetailClick(): void {
    this.omdbService.getById(this.summary.imdbID).then((movie: Movie) => {
      this.movie = movie;
      this.summary.class = 'flex-full expanded';
      this.isDetailClicked = true;
    });
  }
}
