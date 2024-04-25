import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToCart, clearCart, removeFromCart, removeOneProduct } from 'src/app/core/store/actions/cart.action';
import { selectCartItems, selectCartSubtotal } from 'src/app/core/store/selectors/cart.selector';
import { EmptyComponent } from '@components/empty/empty.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, EmptyComponent, MatButtonModule],
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.sass']
})
export class ShoppingComponent {
  cartItems$ = this.store.select(selectCartItems);
  subtotal$ = this.store.select(selectCartSubtotal);

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
  }

  addCart(product: any) {
    this.store.dispatch(addToCart({ product }));
  }

  removeOneProduct(productId: number) {
    this.store.dispatch(removeOneProduct({productId}));
  }

  remove(productId: number) {
    this.store.dispatch(removeFromCart({productId}));
  }

  clear() {
    this.store.dispatch(clearCart());
  }
}