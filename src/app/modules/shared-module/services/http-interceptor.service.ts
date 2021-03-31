import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map } from 'rxjs/operators';
import { Message } from '../models/message';
import { MessageTypes } from '../enums/enum';

/**
 * This service will capture HTTP errors and validate HTTP request upon demand.
 * In this case we will use it to handle errors
 */
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.add(new Message(
          MessageTypes.ERROR,
          `${error.status}: ${error && error.error && error.error.reason ? error.error.reason : error.statusText}`
        ));
        return throwError(error);
      }));
  }
}
