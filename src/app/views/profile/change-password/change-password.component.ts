import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { changePassword } from 'src/app/core/store/actions/user.action';
import { Storage } from '@memento/Storage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatInputModule, MatButtonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent {
  myForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
  ) {
    this.validators();
  }

  save() {
    const user = {
      id: Storage.getItem('user') && Storage.getItem('user').id,
      password: this.myForm.value.password
    }
    this.store.dispatch(changePassword({user}));
  }

  get input() {
    return this.myForm.controls;
  }

  validators() {
    this.myForm = this.fb.group({
      password: ['santiago', [
        Validators.required,
      ]],
      confirmPassword: ['santiago', [
        Validators.required,
        this.passwordMatch.bind(this)
      ]]
    });
  }

  passwordMatch(control: AbstractControl) {
    const password = this.myForm.get('password')?.value;
    return password === control.value ? null : { passwordMismatch: true };
  }
}