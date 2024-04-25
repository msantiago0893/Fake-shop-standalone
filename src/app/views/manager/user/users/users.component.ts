import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { deleteUser, loadUsers } from 'src/app/core/store/actions/user.action';
import { selectUsers } from 'src/app/core/store/selectors/users.selector';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { EmptyComponent } from '@components/empty/empty.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatTableModule, RouterModule, MatPaginatorModule, EmptyComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'operation'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  search:string = '';

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter() {
    const filterValue = this.search.toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.paginator?.firstPage();
  }

  getUsers() {
    this.store.dispatch(loadUsers());

    this.store.select(selectUsers)
      .subscribe((users: any) => {
        this.dataSource.data = users;
      });
  }

  delete(id: number) {
    this.store.dispatch(deleteUser({id}));
  }
}