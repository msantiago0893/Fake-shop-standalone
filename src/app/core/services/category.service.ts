import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Product } from '@model/product.model';
import { Category } from '@model/category.model';
import { ROUTER } from '@constants/routers';
import { AlertService } from './alert.service';
import { MESSAGE } from '@constants/message';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private uri: string = 'https://api.escuelajs.co/api/v1/categories';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private route: Router
  ) { }

  public getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.uri);
  }

  public getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.uri}/${id}`);
  }

  public add(item: Object) {
    return this.http.post(`${this.uri}`, item, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          this.alert.showNotification({
            message: MESSAGE.ADD_CATALOG_SUCCESS
          });

          this.route.navigateByUrl(`/manager/${ROUTER.CATEGORIES}`);
        })
      );
  }

  public update(category: any) {
    const { id, ...item } = category;

    return this.http.put(`${this.uri}/${id}`, item, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          this.alert.showNotification({
            message: MESSAGE.UPDATE_CATALOG_SUCCESS
          });
          this.route.navigateByUrl(`/manager/${ROUTER.CATEGORIES}`);
        })
      );
  }

  public delete(id: number) {
    return this.http.delete(`${this.uri}/${id}`, { headers: this.httpHeaders })
    .pipe(
      tap(() => {
        this.alert.showNotification({
          message: MESSAGE.DELETE_CATALOG_SUCCESS
        });
      })
    );
  }

  public getProductsByCategory(id:number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.uri}/${id}/products`);
  }
}