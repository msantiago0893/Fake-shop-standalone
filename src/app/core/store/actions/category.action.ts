import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/shared/models/category.model";

export const loadCategories = createAction(
  '[Category list] Load Categories',
);

export const loadedCategories = createAction(
  '[Category list] Loaded success',
  props<{ categories: Category[] }>()
);

export const loadCategory = createAction(
  '[Category] Load Category',
  props<{ id: number }>()
);

export const loadedCategory = createAction(
  '[Category] Loaded success',
  props<{ category: Category }>()
);

export const addCategory = createAction(
  '[Category] Add Category',
  props<{ category: { name: string; image: string } }>()
);

export const updateCategory = createAction(
  '[Category] Update Category',
  props<{ category: { id:any, name: string; image: string } }>()
);

export const deleteCategory = createAction(
  '[Category Remove] Remove Category',
  props<{ id: number }>()
);

export const loadProductsByCategory = createAction(
  '[ProductsbyCategory list] Load Products',
  props<{ id: number }>()
);

export const loadedProductsByCategory = createAction(
  '[ProductsbyCategory list] Loaded Products',
  props<{ products: Category[] }>()
);