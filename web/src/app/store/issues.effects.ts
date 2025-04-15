import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; // Aquí importamos 'of'
import { loadIssues, loadIssuesSuccess, loadIssuesFailure } from './issues.actions';
import { IssuesService } from '../issues.service';
import * as IssuesActions from './issues.actions';

@Injectable()
export class IssuesEffects {
  constructor(
    //private actions$: Actions,
    private issues: IssuesService
  ) {}
  private actions$: Actions<IssuesActions.AllIssuesTypes> = inject(Actions);
  // Efecto para cargar las issues
  loadIssues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIssues), 
      map((action) => action.url),
      switchMap((url:string) =>
        this.issues.fetchIssues(url).pipe(
          map((issues) => {
            return loadIssuesSuccess({ issues })}), // Si la llamada es exitosa
          catchError((error) => {
            return of(loadIssuesFailure({ error: error.error.message }))}) // Si ocurre un error, usamos 'of' para emitir un error
        )        
      )
    )
  );
}