import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/core/store/selectors/users.selector';
import { loadUser } from 'src/app/core/store/actions/user.action';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.sass']
})
export class DetailUserComponent {
  idUser: number;
  user$ = this.store.pipe(select(selectUser));

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    this.idUser = route.snapshot.params['id'];
  }

  ngOnInit(): void {

    if (this.idUser) {
      this.getUser();
    }
  }

  getUser() {
    this.store.dispatch(loadUser({ id: this.idUser }));
  }
}