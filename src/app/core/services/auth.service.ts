import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, switchMap, take, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertService } from './alert.service';
import { Storage } from '@memento/Storage';
import { MESSAGE } from '@constants/message';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  route = inject(Router);
  alert = inject(AlertService);

  private uri: string = 'https://api.escuelajs.co/api/v1/auth/login';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  public login(item: Object) {
    return this.http.post(`${this.uri}`, item, { headers: this.httpHeaders }).pipe(
      tap((response: any) => {
        if (response && response.access_token) {
          localStorage.setItem('accessToken', response.access_token);
        }
      }),
      switchMap(() => this.profile()),
      take(1),
      tap(() => {
        console.log("load auth");
        this.route.navigateByUrl('manager');
       //location.reload();
      }),
      catchError((error) => {
        this.alert.showNotification({ icon: 'error', message: MESSAGE.CREDENTIALS_INCORRECT });
        return throwError(error);
      }),
      finalize(() => {
        console.log("load auth");
        this.route.navigateByUrl('/manager'); // Redirigir a la ruta '/manager' después de que todo se haya completado (éxito o error).
      })
    );
  }

  public profile() {
    return this.http.get(
      'https://api.escuelajs.co/api/v1/auth/profile',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        })
      }
    ).pipe(
      tap((response) => localStorage.setItem('user', JSON.stringify(response)))
    );
  }

  logout() {
    Storage.clear();
    location.reload();
  }
}