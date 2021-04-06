import { Component, Input } from '@angular/core';
import { SearchResult } from '../../models/search-result';

@Component({
  selector: 'app-movies',
  templateUrl: './movie-list.component.html',
  styleUrls: ['movie-list.component.scss']
})
export class MovieListComponent {
  @Input()
  searchResults: SearchResult[] = [];
}
