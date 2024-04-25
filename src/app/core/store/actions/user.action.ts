import { User } from "@model/user.model";
import { createAction, props } from "@ngrx/store";

export const loadUsers = createAction(
  '[User list] Load User',
);

export const loadedUsers = createAction(
  '[User list] Loaded success',
  props<{ users: User[] }>()
);

export const loadUser = createAction(
  '[User] Load User',
  props<{ id: number }>()
);

export const loadedUser = createAction(
  '[User] Loaded success',
  props<{ user: User }>()
);

export const addUser = createAction(
  '[User] Add User',
  props<{ user: any }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: any }>()
);

export const deleteUser = createAction(
  '[User Remove] Remove User',
  props<{ id: number }>()
);

export const changePassword = createAction(
  '[User] Change password',
  props<{ user: any }>()
);