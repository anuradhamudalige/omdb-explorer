import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * This service represents the connetion interface for the REST calls
 * You may implement GET, POST, PUT requests here based on your requirement
 */
@Injectable({
  providedIn: 'root'
})
export class HttpConnectionService {

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
