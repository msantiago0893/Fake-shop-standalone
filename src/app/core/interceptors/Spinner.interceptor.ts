
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { setLoading } from '../store/actions/app.action';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(
    private store: Store<any>
  ) {}

  // TODO: Check if the request already exists in the pending requests queue
  private hasRequest(req: HttpRequest<any>): boolean {
    return this.requests.some(request => request.url === req.url);
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);

    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    // TODO: Disable loading if there are no more pending requests
    if (this.requests.length === 0) {
      this.store.dispatch(setLoading({ isLoading: false }));
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Check if the request already exists in the queue
    if (!this.hasRequest(req)) {
      this.requests.push(req);
      this.store.dispatch(setLoading({ isLoading: true }));
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.removeRequest(req);
      })
    );
  }
}