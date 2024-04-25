import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '@memento/Storage';

export const roleGuard: CanActivateFn = (route: any, state) => {
  const router = inject(Router);

  const authorities = route.data.authorities;
  console.log("authorities:", authorities)

  const user: any = Storage.getItem('user') || '';
  console.log("user:", user)

  if (authorities.includes(user.role)) {
    return true;
  }

  //router.navigateByUrl('/signin');

  return false;
};
