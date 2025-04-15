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
  loadingSelector,
} from './store/issues.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxPaginationModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  repoUrl: string = '';
  page = 1;
  itemsPerPage = 5;
  error$!: Observable<string | null>;
  loading$!: Observable<string | null>;
  allIssues$!: Observable<any[]>;

  ngOnInit(): void {
    this.allIssues$ = this.store.select(issuesSelector);
    this.error$ = this.store.select(errorSelector);
    this.loading$ = this.store.select(loadingSelector);
  }

  fetchIssues(): void {
    if (!this.repoUrl) return;

    this.store.dispatch(loadIssues({ url: this.repoUrl }));

  }

  isOffline(): boolean {
    return !navigator.onLine;
  }
}