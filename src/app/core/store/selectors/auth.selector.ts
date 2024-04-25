import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsError = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isError
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isLoading
);
