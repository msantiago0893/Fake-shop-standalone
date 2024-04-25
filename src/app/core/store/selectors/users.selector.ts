import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../reducers/user.reducer";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

