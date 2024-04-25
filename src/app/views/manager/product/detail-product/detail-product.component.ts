import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Store, select } from '@ngrx/store';
import { selectProduct } from 'src/app/core/store/selectors/products.selector';
import { loadProduct } from 'src/app/core/store/actions/product.action';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.sass'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translatex(-100%)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ]
})
export class DetailProductComponent {
  idProduct: number;
  product$ = this.store.pipe(select(selectProduct));

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    this.idProduct = route.snapshot.params['id'];
  }

  ngOnInit(): void {

    if (this.idProduct) {
      this.getProduct();
    }
  }

  getProduct() {
    this.store.dispatch(loadProduct({ id: this.idProduct }));
  }
}