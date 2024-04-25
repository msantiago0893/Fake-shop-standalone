import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectUser } from 'src/app/core/store/selectors/users.selector';
import { Storage } from '@memento/Storage';
import { loadUser } from 'src/app/core/store/actions/user.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass']
})
export class MyAccountComponent {
  account: any;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount() {
    this.store.dispatch(
      loadUser({ id: Storage.getItem('user') && Storage.getItem('user').id })
    );

    this.store.select(selectUser)
      .subscribe((user: any) => {
        this.account = user;
      });
  }
}