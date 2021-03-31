import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './components/message/message.component';
import { MessageService } from './services/message.service';
import { MatPaginatorModule } from '@angular/material/paginator';

/**
 * This module includes shared modules throughout the application such as
 * {@class MessageService, MatPaginatorModule}
 */
@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [MessageService],
  exports: [
    CommonModule,
    MatPaginatorModule,
    MessageComponent
  ]
})
export class SharedModule { }
