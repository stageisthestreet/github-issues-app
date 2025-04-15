import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {

  allIssues: any[] = [];
  page = 1;
  itemsPerPage = 5;
  error = false;
  errorMessage = '';

  constructor(private http:HttpClient) {}

  fetchIssues(url:string):Observable<any> {

    this.error = false;
    if (!url) return of();
    const apiUrl = `https://api.github.com/repos/${url}/issues`;

    if (!navigator.onLine) {
      const cached = localStorage.getItem(apiUrl);

      if (cached) {
        this.allIssues = JSON.parse(cached);
      } else {
        this.errorMessage = 'Sin conexión y sin datos en caché';
        this.error = true;
        this.allIssues = [];
      }
      return of();
    }

    return this.http.get(apiUrl)
  }
}
