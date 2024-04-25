import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  route = inject(Router);

  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }

  isManager() {
    return localStorage.getItem('user') === 'admin';
  }
}
