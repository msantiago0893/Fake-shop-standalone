import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "../reducers/product.reducer";

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectProducts= createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectProduct = createSelector(
  selectProductState,
  (state: ProductState) => state.product
);
