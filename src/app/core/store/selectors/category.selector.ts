import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "../reducers/category.reducer";

export const selectCategoryState = createFeatureSelector<CategoryState>('category');

export const selectCategories = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.categories
);

export const selectCategory = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.category
);

export const selectProductByCategory = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.productsByCategory
);
