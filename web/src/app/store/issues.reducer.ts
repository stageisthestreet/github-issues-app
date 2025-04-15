import { createReducer, on } from '@ngrx/store';
import { loadIssues, loadIssuesSuccess, loadIssuesFailure } from './issues.actions';
export const IssueFeatureKey = 'IssueStore'

export interface IssueState {
  issues: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: IssueState = {
  issues: [],
  loading: false,
  error: null
};

export const issuesReducer = createReducer(
  initialState,
  on(loadIssues, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadIssuesSuccess, (state, { issues }) => {
    console.log('Issues actualizadas en el reducer:', issues);
    return {
      ...state,
      issues,
      loading: false,
      error: null,
    };
  }),
  on(loadIssuesFailure, (state, { error }) => ({
    ...state,
    issues: [],
    loading: false,
    error,
  }))
);