import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';  // Importar FormsModule para usar ngModel

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxPaginationModule, FormsModule],  // Asegúrate de importar FormsModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {
  allIssues: any[] = [];  // Array para almacenar las issues
  repoUrl: string = '';  // URL del repositorio ingresada por el usuario
  page = 1;  // Página actual para ngx-pagination
  itemsPerPage = 5;  // Número de issues por página

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchIssues();  // Cargar issues por defecto cuando no hay URL
  }

  // Función para obtener issues desde la API de GitHub
  fetchIssues(): void {
    if (!this.repoUrl) return;  // Si la URL está vacía, no hacemos nada.

    const apiUrl = `https://api.github.com/repos/${this.repoUrl}/issues`;

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.allIssues = data;
        console.log(this.allIssues);  // Ver las issues en consola (opcional)
      },
      error: (error) => {
        console.error('Error al obtener las issues:', error);
      }
    });
  }
}