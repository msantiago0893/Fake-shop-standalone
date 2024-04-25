import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Store } from '@ngrx/store';
import { deleteCategory, loadCategories } from 'src/app/core/store/actions/category.action';
import { selectCategories } from 'src/app/core/store/selectors/category.selector';
import { CategoryState } from 'src/app/core/store/reducers/category.reducer';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { EmptyComponent } from '@components/empty/empty.component';
import { FilterProductPipe } from 'src/app/shared/pipes/filter-product.pipe';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, EmptyComponent, FilterProductPipe, FilterPipe, FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatTableModule, RouterModule, MatPaginatorModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'name', 'creationAt', 'operation'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  search: string = '';

  store = inject(Store<CategoryState>);

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getCategories() {
    this.store.dispatch(loadCategories());

    this.store.select(selectCategories)
      .subscribe((categories: any) => {
        this.dataSource.data = categories;
      });
  }

  deleteCategory(id: number) {
    this.store.dispatch(deleteCategory({id}));
  }
}