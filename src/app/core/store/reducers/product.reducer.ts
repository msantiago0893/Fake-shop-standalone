import {createReducer , on } from '@ngrx/store';
import { deleteUser, loadedUser, loadedUsers } from '../actions/user.action';
import { Product } from '@model/product.model';
import { deleteProduct, loadedProduct, loadedProducts } from '../actions/product.action';

export interface ProductState {
  products: ReadonlyArray<Product>,
  product: Product
}

export const initialState: ProductState = {
  products: [],
  product: {
    id: 0,
    title: '',
    images: [],
    price: 0,
    description: '',
    creationAt: new Date(),
    updatedAt: new Date(),
    category: {
      creationAt: new Date(),
      id: 1,
      image: '',
      name: '',
      updatedAt: new Date(),
    }
  }
}

export const ProductReducer = createReducer(
  initialState,
  on(loadedProducts, (state, { products }) => {
    return { ...state, products};
  }),
  on(loadedProduct, (state, { product }) => {
    return { ...state, product};
  }),
  on(deleteProduct, (state) => {
    return { ...state};
  }),
);