import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { addUser, loadUser, updateUser } from 'src/app/core/store/actions/user.action';
import { selectUser } from 'src/app/core/store/selectors/users.selector';
import { User } from '@model/user.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatDividerModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent {
  myForm: FormGroup = new FormGroup({});
  idUser: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    this.validators();

    this.idUser = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.idUser) {
      this.getUser();
    }
  }

  getUser() {
    this.store.dispatch(loadUser({id: this.idUser}));

    this.store.select(selectUser)
      .subscribe((user: User) => {
        this.myForm.patchValue(user);
      });
  }

  save() {
    this.store.dispatch(addUser({
      user: this.myForm.value
    }));
  }

  update() {
    this.store.dispatch(updateUser({
      user: { id: this.idUser, ...this.myForm.value}
    }));
  }

  get input(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  validators() {
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      role: ['', [
        Validators.required
      ]],
      avatar: ['', [
        Validators.required
      ]]
    });
  }

}