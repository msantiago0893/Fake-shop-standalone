import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { authenticatedGuard } from '@guards/authenticated.guard';
import { roleGuard } from '@guards/role.guard';
import { ACL } from './security/ACL';

export const routes: Routes = [
	{
		path: 'signin',
		canActivate: [authGuard],
		loadComponent: () => import('./views/auth/signin/signin.component').then(mod => mod.SigninComponent)
	},
	{
		path: 'signup',
		loadComponent: () => import('./views/auth/signup/signup.component').then(mod => mod.SignupComponent)
	},
	{
    path:'',
    canActivate: [authenticatedGuard],
    data: {
      authorities: [
        'admin',
        'customer'
      ]
    },
		children: [
			{
        path: '',
        redirectTo: ACL.getDefaultRedirectPath(), pathMatch: 'full'
      },
			{
				path: 'manager',
				canActivate: [roleGuard],
				loadChildren: () => import('./views/manager/manager.routes').then(routes => routes.ManagerRoutes),
				data: {
					authorities: ['admin']
				}
			},
			{
				path: 'customer',
				canActivate: [roleGuard],
				loadChildren: () => import('./views/customer/customer.routes').then(routes => routes.CustomerRoutes),
				data: {
					authorities: ['customer']
				}
			}
		]
	},
	{
    path: '',
    redirectTo: 'signin',
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
