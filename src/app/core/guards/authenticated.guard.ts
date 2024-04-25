import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '@services/session.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const _sessionService = inject(SessionService);
  const router = inject(Router);

  if (_sessionService.isAuthenticated()) {
    return true;
  }

  router.navigateByUrl('/signin');
  return false;
};
