import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IssueFeatureKey, IssueState } from './issues.reducer';
export const selectIssuesState =
  createFeatureSelector<IssueState>(IssueFeatureKey);
export const loadingSelector = createSelector(
  selectIssuesState,
  (state: IssueState) => !!state?.loading // esto fuerza a booleano
);
export const errorSelector = createSelector(
  selectIssuesState,
  (state) => !!state?.error // Transforma cualquier string/null a boolean
);
export const issuesSelector = createSelector(
  (state: any) => state.issues.issues, // Asumiendo que 'issues' está dentro de otro objeto llamado 'issues'
  (issues) => issues || [] // Devuelve un array vacío si no hay issues
);
