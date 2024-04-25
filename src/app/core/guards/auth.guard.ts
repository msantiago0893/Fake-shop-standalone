import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@services/session.service';

export const authGuard = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (!sessionService.isAuthenticated()) {
    return true;
  }

  console.log('esta autenticado ', sessionService.isAuthenticated());

  router.navigateByUrl('/manager');
  return false;
};
