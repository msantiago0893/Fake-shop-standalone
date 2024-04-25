import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { CategoryService } from "../../services/category.service";
import { addCategory, loadCategory, loadProductsByCategory, updateCategory } from "../actions/category.action";

@Injectable()
export class CategoryEffect {

  constructor(
    private actions$: Actions,
    private _service: CategoryService
  ) {}

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType('[Category list] Load Categories'),
    switchMap(
      () => this._service.getAll()
        .pipe(
          map(categories => ({ type: '[Category list] Loaded success', categories })),
          catchError(() => EMPTY)
        )
    )
  ));

  loadCategory$ = createEffect(() => this.actions$.pipe(
    ofType(loadCategory),
    switchMap(
      (action) => this._service.getById(action.id)
        .pipe(
          map(category => ({ type: '[Category] Loaded success', category })),
          catchError(() => EMPTY)
        )
    )
  ));

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCategory),
      switchMap((action) =>
        this._service.add(action.category)
      )
    ),
    { dispatch: false }
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategory), //TODO: listen for the 'addCategory' action
      switchMap((action) =>
        this._service.update(action.category)
      )
    ),
    { dispatch: false } //TODO: No actions need to be dispatched in this effect
  );

  deleteCategory$ = createEffect(() => this.actions$.pipe(
    ofType('[Category Remove] Remove Category'),
    switchMap(({ id }) =>
      this._service.delete(id)
        .pipe(
          concatMap(() => [ //TODO: execute multiple actions
            { type: '[Category Remove] Remove success' }, //TODO: Test action
            { type: '[Category list] Load Categories' }
          ])
        )
    )
  ));

  loadProductsByCategory$ = createEffect(() => this.actions$.pipe(
    ofType(loadProductsByCategory),
    switchMap(
      ({ id }) => this._service.getProductsByCategory(id)
        .pipe(
          map(products => ({ type: '[ProductsbyCategory list] Loaded Products', products })),
          catchError(() => EMPTY)
        )
    )
  ));
}