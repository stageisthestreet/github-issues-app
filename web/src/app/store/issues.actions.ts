import { createAction, props, union } from '@ngrx/store';

export const loadIssues = createAction('[Issues] Load Issues', props<{url:string}>());
export const loadIssuesSuccess = createAction('[Issues] Load Issues Success', props<{ issues: any[] }>());
export const loadIssuesFailure = createAction('[Issues] Load Issues Failure', props<{ error: string }>());

const IssuesActionsUnion = union({
    loadIssues,
    loadIssuesFailure,
    loadIssuesSuccess
  });

  export type AllIssuesTypes = typeof IssuesActionsUnion;