import { createAction, props } from '@ngrx/store';

export const loadIssues = createAction('[Issues] Load Issues');
export const loadIssuesSuccess = createAction('[Issues] Load Issues Success', props<{ issues: any[] }>());
export const loadIssuesFailure = createAction('[Issues] Load Issues Failure', props<{ error: string }>());