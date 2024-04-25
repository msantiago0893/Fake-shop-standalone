import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@model/product.model';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/core/store/actions/product.action';
import { selectProducts } from 'src/app/core/store/selectors/products.selector';
import { addToCart } from 'src/app/core/store/actions/cart.action';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterProductPipe } from 'src/app/shared/pipes/filter-product.pipe';
import { ImageDirective } from '@directives/image.directive';
import { fadeAnimation } from 'src/app/shared/animations/animation';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatInputModule, MatFormFieldModule, MatIconModule, FormsModule, ReactiveFormsModule, MatButtonModule, FilterProductPipe, ImageDirective],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass'],
  animations: [
    fadeAnimation
  ]
})
export class GalleryComponent {
  products = signal<Array<Product>>([]);
  search: string = '';

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(loadProducts());

    this.store.select(selectProducts)
      .subscribe((response: any) => {
        this.products.set(response);
      });
  }

  addCart(product: any) {
    this.store.dispatch(addToCart({ product }));
  }

}