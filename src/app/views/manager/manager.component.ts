import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { setError } from 'src/app/core/store/actions/app.action';
import { RouterModule, RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { selectIsError, selectIsLoading } from 'src/app/core/store/selectors/app.selector';

import { Storage } from 'src/app/memento/Storage';
import { fadeAnimation } from 'src/app/shared/animations/animation';
import { AuthService } from '@services/auth.service';
import { ErrorComponent } from '@components/error/error.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    //ReactiveFormsModule,
    //FormsModule,
    ErrorComponent,
    SpinnerComponent,
    MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, MatSidenavModule, MatListModule, MatExpansionModule],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.sass'],
  animations: [
    fadeAnimation
  ]
})
export class ManagerComponent {
  isSidebarOpen = true;
  user = '';
  isLoading = false;
  subscription: Subscription = new Subscription();
  isError$ = this.store.select(selectIsError);
  isLoading$ = this.store.select(selectIsLoading);


  constructor(
    private router: Router,
    private store: Store<any>,
    private cdr: ChangeDetectorRef,
    public auth: AuthService
  ) {
    this.user = Storage.getItem('user') && Storage.getItem('user').name;
  }

  ngOnInit(): void {
    console.log('Manager');
   }

  ngAfterViewInit(): void {

    this.changeOfRoute();

    this.store.select(selectIsLoading)
      .subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
        this.cdr.detectChanges();   //TODO Call detectChanges to force the view to update
      });
  }

  changeOfRoute() {

    this.subscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.store.dispatch(setError({isError: false}));
      });
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}