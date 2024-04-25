import { Routes } from "@angular/router";
import { CategoriesComponent } from "./category/categories/categories.component";
import { AddCategoryComponent } from "./category/add-category/add-category.component";
import { UsersComponent } from "./user/users/users.component";
import { ProductsComponent } from "./product/products/products.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { AddUserComponent } from "./user/add-user/add-user.component";
import { ManagerComponent } from "./manager.component";
import { ROUTER } from "@constants/routers";
import { DetailUserComponent } from "./user/detail-user/detail-user.component";
import { DetailCategoryComponent } from "./category/detail-category/detail-category.component";
import { DetailProductComponent } from "./product/detail-product/detail-product.component";
import { ViewProductComponent } from "./category/view-product/view-product.component";
import { MyAccountComponent } from "../profile/my-account/my-account.component";
import { ChangePasswordComponent } from "../profile/change-password/change-password.component";

export const ManagerRoutes: Routes = [
  {
    path: '', component: ManagerComponent,
    children: [
      {
        path: ROUTER.CATEGORIES,
        title: 'Categorias',
        component: CategoriesComponent
      },
      {
        path: ROUTER.ADD_CATEGORY,
        title: 'Agregar categoria',
        component: AddCategoryComponent
      },
      {
        path: ROUTER.UPDATE_CATEGORY,
        title: 'Editar categoria',
        component: AddCategoryComponent
      },
      {
        path: ROUTER.DETAIL_CATEGORY,
        component: DetailCategoryComponent
      },
      {
        path: ROUTER.CATEGORY_BY_PRODUCTS,
        component: ViewProductComponent
      },
      {
        path: ROUTER.USERS,
        title: 'Usuarios',
        component: UsersComponent
      },
      {
        path: ROUTER.ADD_USER,
        title: 'Agregar usuario',
        component: AddUserComponent
      },
      {
        path: ROUTER.UPDATE_USER,
        title: 'Editar usuario',
        component: AddUserComponent
      },
      {
        path: ROUTER.DETAIL_USER,
        component: DetailUserComponent
      },
      {
        path: ROUTER.PRODUCTS,
        title: 'Productos',
        component: ProductsComponent
      },
      {
        path: ROUTER.ADD_PRODUCT,
        title: 'Agregar producto',
        component: AddProductComponent
      },
      {
        path: ROUTER.UPDATE_PRODUCT,
        title: 'Editar producto',
        component: AddProductComponent
      },
      {
        path: ROUTER.DETAIL_PRODUCT,
        component: DetailProductComponent
      },
      {
        path: ROUTER.MY_ACCOUNT,
        component: MyAccountComponent
      },
      {
        path: ROUTER.UPDATE_PASSWORD,
        component: ChangePasswordComponent
      },
      {
        path: '**',
        redirectTo: 'categories'
      }
    ]
  }
];