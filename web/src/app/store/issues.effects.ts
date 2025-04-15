import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadIssues, loadIssuesSuccess, loadIssuesFailure } from './issues.actions';
import { IssuesService } from '../issues.service';
import * as IssuesActions from './issues.actions';

@Injectable()
export class IssuesEffects {
  constructor(
    private issues: IssuesService
  ) {}
  private actions$: Actions<IssuesActions.AllIssuesTypes> = inject(Actions);
  loadIssues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIssues), 
      map((action) => action.url),
      switchMap((url:string) =>
        this.issues.fetchIssues(url).pipe(
          map((issues) => {
            return loadIssuesSuccess({ issues })}),
          catchError((error) => {
            return of(loadIssuesFailure({ error: error.error.message }))})
        )        
      )
    )
  );
}