import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartTotalItems = createSelector(
  selectCartItems,
  (items) => items.length
);

export const selectCartSubtotal = createSelector(
  selectCartItems,
  (items) => {
    return items.reduce((subtotal, item: any) => subtotal + (item.quantity * item.price), 0);
  }
);
