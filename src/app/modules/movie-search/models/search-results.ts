import { SearchResult } from './search-result';

export class SearchResults {
  Search: SearchResult[] = [];
  totalResults = 0;
  Response: 'False' | 'True' = 'False';
  Error = '';
  pageIndex?: number;
}
