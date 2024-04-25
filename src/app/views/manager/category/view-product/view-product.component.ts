import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { selectCategory, selectProductByCategory } from 'src/app/core/store/selectors/category.selector';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { loadProductsByCategory } from 'src/app/core/store/actions/category.action';
import { MatIconModule } from '@angular/material/icon';
import { EmptyComponent } from '@components/empty/empty.component';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatPaginatorModule, MatTableModule, EmptyComponent, RouterModule],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.sass']
})
export class ViewProductComponent {
  idCategory: any;
  categorias$ = this.store.select(selectCategory);
  products: Array<any> = [];
  displayedColumns: string[] = ['name', 'price', 'description', 'creationAt'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    this.idCategory = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getProducts() {
    this.store.dispatch(loadProductsByCategory({id: this.idCategory}));

    this.store.select(selectProductByCategory)
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  }
}
