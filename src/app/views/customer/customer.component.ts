import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '@services/auth.service';
import { Store, select } from '@ngrx/store';
import { selectCartTotalItems } from 'src/app/core/store/selectors/cart.selector';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, RouterModule, MatDividerModule, MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.sass']
})
export class CustomerComponent {
  totalItems$ = this.store.pipe(select(selectCartTotalItems));

  constructor(
    private store: Store<any>,
    private session: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.session.logout();
  }
}