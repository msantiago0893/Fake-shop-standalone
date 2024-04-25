import { Product } from "@model/product.model";
import { createAction, props } from "@ngrx/store";

export const loadProducts = createAction(
  '[Product list] Load Product',
);

export const loadedProducts = createAction(
  '[Product list] Loaded success',
  props<{ products: Product[] }>()
);

export const loadProduct = createAction(
  '[Product] Load Product',
  props<{ id: number }>()
);

export const loadedProduct = createAction(
  '[Product] Loaded success',
  props<{ product: Product }>()
);

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: any }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: any }>()
);

export const deleteProduct = createAction(
  '[Product Remove] Remove Product',
  props<{ id: number }>()
);