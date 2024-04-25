import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { deleteProduct, loadProducts } from 'src/app/core/store/actions/product.action';
import { selectProducts } from 'src/app/core/store/selectors/products.selector';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { EmptyComponent } from '@components/empty/empty.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { fadeAnimation } from 'src/app/shared/animations/animation';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatTableModule, RouterModule, MatPaginatorModule, EmptyComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
  animations: [
    fadeAnimation
  ]
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'operation'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  search: string = '';

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProducts() {
    this.store.dispatch(loadProducts());

    this.store.select(selectProducts)
      .subscribe((products: any) => {
        this.dataSource.data = products;
      });
  }

  delete(id: number) {
    this.store.dispatch(deleteProduct({id}));
  }
}