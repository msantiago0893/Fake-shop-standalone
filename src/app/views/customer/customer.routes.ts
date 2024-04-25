import { Routes } from "@angular/router";
import { CustomerComponent } from "./customer.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { ContactComponent } from "./contact/contact.component";
import { ROUTER } from "@constants/routers";
import { ShoppingComponent } from "./shopping/shopping.component";
import { MyAccountComponent } from "../profile/my-account/my-account.component";
import { ChangePasswordComponent } from "../profile/change-password/change-password.component";

export const CustomerRoutes: Routes = [
  {
    path: '', component: CustomerComponent,
    children: [
      {
        path: ROUTER.GALLERY,
        title: 'Galeria',
        component: GalleryComponent
      },
      {
        path: ROUTER.CONTACT,
        title: 'Contacto',
        component: ContactComponent
      },
      {
        path: ROUTER.SHOPPPING,
        component: ShoppingComponent
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
        redirectTo: 'gallery'
      }
    ]
  }
];