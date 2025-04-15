import {createSelector } from '@ngrx/store';

export const loadingSelector = createSelector(
  (state: any) => state.issues.loading,
  (loading) => loading || null
);
export const errorSelector = createSelector(
  (state: any) => state.issues.error,
  (error) => error || null
);
export const issuesSelector = createSelector(
  (state: any) => state.issues.issues,
  (issues) => issues || []
);

export const selectIssues = issuesSelector;
export const selectError = errorSelector;