import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { addProduct, deleteProduct, loadProduct, loadProducts, updateProduct } from "../actions/product.action";
import { catchError, concatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { ProductService } from "@services/product.service";

@Injectable()
export class ProductEffect {

  constructor(
    private actions$: Actions,
    private service: ProductService
  ) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(
      () => this.service.getAll()
        .pipe(
          map(items => ({ type: '[Product list] Loaded success', products: items })),
          catchError(() => EMPTY)
        )
    )
  ));

  loadProduct$ = createEffect(() => this.actions$.pipe(
    ofType(loadProduct),
    switchMap(
      (action) => this.service.getById(action.id)
        .pipe(
          map(product => ({ type: '[Product] Loaded success', product })),
          catchError(() => EMPTY)
        )
    )
  ));

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      switchMap((action) =>
        this.service.add(action.product)
      )
    ),
    { dispatch: false }
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap((action) =>
        this.service.update(action.product)
      )
    ),
    { dispatch: false }
  );

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProduct),
    switchMap(({ id }) =>
      this.service.delete(id)
        .pipe(
          concatMap(() => [
            { type: '[Product list] Load Product' }
          ])
        )
    )
  ));
}