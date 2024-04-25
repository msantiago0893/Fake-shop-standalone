import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '@model/user.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ROUTER } from '@constants/routers';
import { AlertService } from './alert.service';
import { MESSAGE } from '@constants/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  route = inject(Router);
  alert = inject(AlertService);

  private uri: string = 'https://api.escuelajs.co/api/v1/users';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.uri, { headers: this.httpHeaders });
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.uri}/${id}`);
  }

  public add(item: Object) {
    return this.http.post(`${this.uri}`, item, { headers: this.httpHeaders })
    .pipe(
      tap(() => {
        this.alert.showNotification({
          message: MESSAGE.ADD_USER_SUCCESS
        });

        this.route.navigateByUrl(`/manager/${ROUTER.USERS}`);
      })
    );
  }

  public changePassword(user: any) {
    return this.update(user)
      .pipe(
        tap(() => {
          this.alert.showNotification({
            message: MESSAGE.UPDATE_PASSWORD_SUCCESS
          });
        })
      );
  }

  public updateUser(user: any) {
    return this.update(user)
      .pipe(
        tap(() => {
          this.alert.showNotification({
            message: MESSAGE.UPDATE_USER_SUCCESS
          });
          this.route.navigateByUrl(`/manager/${ROUTER.USERS}`);
        })
      );
  }

  public update(user: any) {
    const { id, ...item } = user;
    return this.http.put(`${this.uri}/${id}`, item, { headers: this.httpHeaders });
  }

  public delete(id: number) {
    return this.http.delete(`${this.uri}/${id}`, { headers: this.httpHeaders })
    .pipe(
      tap(() => {
        this.alert.showNotification({
          message: MESSAGE.DELETE_USER_SUCCESS
        });
      })
    );
  }
}