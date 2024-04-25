import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { ROOT_REDUCERS } from './core/store/app.state';

import { UserEffect } from './core/store/effects/user.effect';
import { ProductEffect } from './core/store/effects/product.effect';
import { CategoryEffect } from './core/store/effects/category.effect';
import { AuthEffect } from './core/store/effects/auth.effect';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpErrorInterceptor } from '@interceptors/error.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SpinnerInterceptor } from '@interceptors/Spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideStore(ROOT_REDUCERS),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([
      AuthEffect,
      UserEffect,
      CategoryEffect,
      ProductEffect
    ]),

    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntl },
  ]
};
