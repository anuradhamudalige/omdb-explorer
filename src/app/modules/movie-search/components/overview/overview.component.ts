import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { OmdbService } from '../../services/omdb.service';
import { SearchResults } from '../../models/search-results';
import { MessageService } from '../../../shared-module/services/message.service';
import { MessageTypes } from '../../../shared-module/enums/enum';
import { Message } from '../../../shared-module/models/message';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  get searchResults(): SearchResults | null {
    return this._searchResults;
  }

  set searchResults(value: SearchResults | null) {
    this._searchResults = value;
    if (value?.pageIndex === 1) {
      this.paginator?.firstPage();
    }
  }

  searchCriteria = '';
  private _searchResults: SearchResults | null = null;
  @ViewChild(MatPaginator) private paginator: MatPaginator | undefined;

  pageSize = 10;

  protected omdbService: OmdbService;
  protected messageService: MessageService;

  constructor(private injector: Injector) {
    this.omdbService = this.injector.get(OmdbService);
    this.messageService = this.injector.get(MessageService);
  }

  ngOnInit(): void {
    this.addWelcomeMessage();
  }

  onSearch(searchCriteria: string, pageIndex: number = 1): void {
    this.searchCriteria = searchCriteria;
    this.omdbService.search(searchCriteria, pageIndex).then((value: SearchResults) => {
      if (value.Response === 'True') {
        value.pageIndex = pageIndex;
        this.searchResults = value;
      } else {
        this.onError(value.Error);
      }
    });
  }

  private addWelcomeMessage(): void {
    this.messageService.add(new Message(
      MessageTypes.INFO,
      'Welcome to the OMDB Search, search something in the bar above!'));
  }

  private onError(errorMessage: string): void {
    this.searchResults = null;
    this.messageService.add(new Message(
      MessageTypes.ERROR,
      errorMessage));
  }

  onPagination(event: PageEvent): void {
    this.onSearch(this.searchCriteria, event.pageIndex + 1);
  }
}
