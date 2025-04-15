import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadIssues } from './store/issues.actions';
import {
  errorSelector,
  issuesSelector,
} from './store/issues.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxPaginationModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  repoUrl: string = '';
  page = 1;
  itemsPerPage = 5;
  error = false;
  error$!: Observable<string | null>;
  allIssues$!: Observable<any[]>;

  ngOnInit(): void {
    // Seleccionamos el estado de los issues y el error desde el store
    this.allIssues$ = this.store.select(issuesSelector);
  }

  fetchIssues(): void {
    if (!this.repoUrl) return;

    // Despachamos la acción para cargar los issues
    this.store.dispatch(loadIssues({ url: this.repoUrl }));
    console.log('Despachando acción para cargar issues...');
  }

  isOffline(): boolean {
    return !navigator.onLine; // Verifica si el usuario está offline
  }
}