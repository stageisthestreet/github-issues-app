import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxPaginationModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {
  allIssues: any[] = [];
  repoUrl: string = '';
  page = 1;
  itemsPerPage = 5;
  error = false;
  errorMesage = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchIssues();
  }

  fetchIssues(): void {
    this.error = false;
    if (!this.repoUrl) return;

    const apiUrl = `https://api.github.com/repos/${this.repoUrl}/issues`;

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.allIssues = data;
        console.log(this.allIssues);
      },
      error: (error) => {
        this.errorMesage = "Error al obtener las incidencias";
        this.error = true;
      }
    });
  }

  // Aquí, utilizamos `navigator` global
  isOffline(): boolean {
    return !navigator.onLine;
  }
}