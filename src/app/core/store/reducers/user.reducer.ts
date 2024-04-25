import {createReducer , on } from '@ngrx/store';
import { User } from '@model/user.model';
import { deleteUser, loadedUser, loadedUsers } from '../actions/user.action';

export interface UserState {
  users: ReadonlyArray<User>,
  user: User
}

export const initialState: UserState = {
  users: [],
  user: {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: '',
    avatar: '',
    creationAt: '',
    updatedAt: ''
  }
}

export const UserReducer = createReducer(
  initialState,
  on(loadedUsers, (state, { users }) => {
    return { ...state, users};
  }),
  on(loadedUser, (state, { user }) => {
    return { ...state, user};
  }),
  on(deleteUser, (state) => {
    return { ...state};
  }),
);