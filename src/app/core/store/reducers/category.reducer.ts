import {createReducer , on } from '@ngrx/store';
import { Category } from 'src/app/shared/models/category.model';
import { addCategory, deleteCategory, loadCategories, loadedCategories, loadedCategory, loadedProductsByCategory } from '../actions/category.action';

export interface CategoryState {
  categories: ReadonlyArray<Category>,
  category: Category,
  productsByCategory: ReadonlyArray<Category>
}

export const initialState: CategoryState = {
  categories: [],
  category: {
    id: 0,
    name: '',
    image: '',
    creationAt: '',
    updatedAt: '',
  },
  productsByCategory: []
}

export const CategoryReducer = createReducer(
  initialState,
  on(loadedCategories, (state, { categories }) => {
    return { ...state, categories};
  }),
  on(loadedCategory, (state, { category }) => {
    return { ...state, category: category};
  }),
  on(deleteCategory, (state) => {
    return { ...state};
  }),
  on(loadedProductsByCategory, (state, { products }) => {
    return { ...state, productsByCategory: products};
  })
);