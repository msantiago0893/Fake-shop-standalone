import { Product } from '@model/product.model';
import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: number }>()
);

export const removeOneProduct = createAction(
  '[Cart] Remove one product',
  props<{ productId: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');