import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http= inject(HttpClient)
 
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
 
  post<T>(url: string, body: T): Observable<T> {
    return this.http.post<T>(url, body);
  }

  put<T>(url: string, body: T): Observable<T> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
