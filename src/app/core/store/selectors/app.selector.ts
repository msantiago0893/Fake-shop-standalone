import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectIsLoading = createSelector(
  selectAppState,
  (state) => state.isLoading
);

export const selectIsError = createSelector(
  selectAppState,
  (state) => state.isError
);