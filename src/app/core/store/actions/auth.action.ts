import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Auth] Login',
  props<{  credentials:  { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success'
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ message: any }>()
);

export const profile = createAction(
  '[Auth] Profile Success'
);