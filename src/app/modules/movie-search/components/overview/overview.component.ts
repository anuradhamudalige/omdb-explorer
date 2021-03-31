import { Component, Injector, OnInit } from '@angular/core';
import { OmdbService } from '../../services/omdb.service';
import { SearchResults } from '../../models/search-results';
import { MessageService } from '../../../shared-module/services/message.service';
import { MessageTypes } from '../../../shared-module/enums/enum';
import { Message } from '../../../shared-module/models/message';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  searchCriteria = '';
  searchResults: SearchResults | null = null;

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

  onSearch(searchCriteria: string, pageIndex?: number): void {
    this.searchCriteria = searchCriteria;
    this.omdbService.search(searchCriteria, pageIndex).then((value: SearchResults) => {
      if (value.Response === 'True') {
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
