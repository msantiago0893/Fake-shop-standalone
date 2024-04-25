import { Product } from '@model/product.model';
import { createReducer, on } from '@ngrx/store';
import { addToCart, clearCart, removeFromCart, removeOneProduct } from '../actions/cart.action';

export interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    const existingProductIndex = state.items.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedItems: any = [...state.items];
      updatedItems[existingProductIndex] = {
        ...updatedItems[existingProductIndex],
        quantity: updatedItems[existingProductIndex].quantity + 1,
      };
      return { ...state, items: updatedItems };
    } else {
      const updatedItems = [...state.items, { ...product, quantity: 1 }];
      return { ...state, items: updatedItems };
    }
  }),
  on(removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.id !== productId),
  })),
  on(removeOneProduct, (state, { productId }) => {
    const updatedItems = state.items.map((item: any) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    return { ...state, items: updatedItems };
  }),
  on(clearCart, state => ({
    ...state,
    items: [],
  }))
);
