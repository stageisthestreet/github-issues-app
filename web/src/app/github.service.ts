// src/app/github.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private baseUrl = 'https://api.github.com/repos';

  constructor(private http: HttpClient) {}

  // Método para obtener las issues de un repositorio
  getIssues(owner: string, repo: string): Observable<any[]> {
    const url = `${this.baseUrl}/${owner}/${repo}/issues`;
    return this.http.get<any[]>(url);
  }
}
