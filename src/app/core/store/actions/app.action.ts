import { createAction, props } from '@ngrx/store';

export const setLoading = createAction(
  '[App] Set Loading',
  props<{ isLoading: boolean }>()
);

export const setError = createAction(
  '[App] Set Error',
  props<{ isError: boolean }>()
);