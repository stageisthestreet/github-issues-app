import {createSelector } from '@ngrx/store';

export const loadingSelector = createSelector(
  (state: any) => state.issues.loading, // Asumiendo que 'issues' está dentro de otro objeto llamado 'issues'
  (loading) => loading || null  // esto fuerza a booleano
);
export const errorSelector = createSelector(
  (state: any) => state.issues.error, // Asumiendo que 'issues' está dentro de otro objeto llamado 'issues'
  (error) => error || null // Transforma cualquier string/null a boolean
);
export const issuesSelector = createSelector(
  (state: any) => state.issues.issues, // Asumiendo que 'issues' está dentro de otro objeto llamado 'issues'
  (issues) => issues || [] // Devuelve un array vacío si no hay issues
);

export const selectIssues = issuesSelector;
export const selectError = errorSelector;