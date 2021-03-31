import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './components/movies/movie-list.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { MovieComponent } from './components/movies/movie/movie.component';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
  declarations: [
    MovieListComponent,
    OverviewComponent,
    ToolBarComponent,
    MovieComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MovieListComponent,
    OverviewComponent,
    ToolBarComponent,
    MovieComponent
  ]
})
export class MovieSearchModule { }
