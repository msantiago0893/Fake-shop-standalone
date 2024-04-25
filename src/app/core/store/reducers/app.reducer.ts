import {createReducer , on } from '@ngrx/store';
import { setError, setLoading } from '../actions/app.action';

export interface AppState {
  isLoading: boolean;
  isError: boolean;
}

export const initialState: AppState = {
  isLoading: false,
  isError: false,
};

export const AppReducer = createReducer(
  initialState,
  on(setLoading, (state, { isLoading }) => ({ ...state, isLoading })),
  on(setError, (state, { isError }) => ({ ...state, isError }))
);