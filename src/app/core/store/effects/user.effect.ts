import { Injectable } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { addUser, changePassword, deleteUser, loadUser, loadUsers, updateUser } from "../actions/user.action";

@Injectable()
export class UserEffect {

  constructor(
    private actions$: Actions,
    private service: UserService
  ) {}

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    mergeMap(
      () => this.service.getAll()
        .pipe(
          map(items => ({ type: '[User list] Loaded success', users: items })),
          catchError(() => EMPTY)
        )
    )
  ));

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadUser),
    switchMap(
      (action) => this.service.getById(action.id)
        .pipe(
          map(user => ({ type: '[User] Loaded success', user })),
          catchError(() => EMPTY)
        )
    )
  ));

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap((action) =>
        this.service.add(action.user)
      )
    ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap((action) =>
        this.service.updateUser(action.user)
      )
    ),
    { dispatch: false }
  );

  deleteCategory$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUser),
    switchMap(({ id }) =>
      this.service.delete(id)
        .pipe(
          concatMap(() => [
            { type: '[User list] Load User' }
          ])
        )
    )
  ));

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePassword),
      switchMap((action) =>
        this.service.changePassword(action.user)
      )
    ),
    { dispatch: false }
  );
}