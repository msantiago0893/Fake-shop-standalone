import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from "../../services/auth.service";
import * as AuthActions from '../actions/auth.action';
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { of } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class AuthEffect {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private _router: Router
  ) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    exhaustMap((action: any) =>
      this.authService.login({
        email: action.email,
        password: action.password
      })
        .pipe(
          map(() => {
            return AuthActions.loginSuccess()
        }),
          catchError(() =>
            of(
              AuthActions.loginFailure({ message: 'Credenciales incorrectas' })
            )
          )
        )
    )
  ));

  loginSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((_) => {
        this._router.navigateByUrl('manager');
      })
    ),
    { dispatch: false }
  );

  profile$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.profile),
    exhaustMap(() =>
      this.authService.profile()
        .pipe(
          map(() => {
            return AuthActions.loginSuccess()
          })
        )
    )
  ));
}