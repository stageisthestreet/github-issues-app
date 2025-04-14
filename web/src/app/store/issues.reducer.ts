import { createReducer, on } from '@ngrx/store';
import { loadIssues, loadIssuesSuccess, loadIssuesFailure } from './issues.actions';

export interface IssueState {
  issues: any[]; // Lista de issues
  loading: boolean; // Estado de carga
  error: string | null; // Mensaje de error
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
    loading: true, // Cuando se carga, cambiamos el estado a cargando
  })),
  on(loadIssuesSuccess, (state, { issues }) => ({
    ...state,
    issues, // Actualizamos las issues en el estado
    loading: false, // Finaliza el estado de carga
    error: null, // Limpiamos cualquier error anterior
  })),
  on(loadIssuesFailure, (state, { error }) => ({
    ...state,
    loading: false, // Finaliza el estado de carga
    error, // Guardamos el error
  }))
);