// src/app/store/issues.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; // Aquí importamos 'of'
import { GitHubService } from '../github.service';
import { loadIssues, loadIssuesSuccess, loadIssuesFailure } from './issues.actions';

@Injectable()
export class IssuesEffects {
  constructor(
    private actions$: Actions,
    private gitHubService: GitHubService,
    private store: Store
  ) {}

  // Efecto para cargar las issues
  loadIssues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIssues), // Cuando se dispare la acción loadIssues
      switchMap(() =>
        this.gitHubService.getIssues('angular', 'angular').pipe(
          map((issues) => loadIssuesSuccess({ issues })), // Si la llamada es exitosa
          catchError((error) => of(loadIssuesFailure({ error: error.message }))) // Si ocurre un error, usamos 'of' para emitir un error
        )
      )
    )
  );
}
