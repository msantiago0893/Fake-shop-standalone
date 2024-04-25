import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { login } from 'src/app/core/store/actions/auth.action';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '@components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, HeaderComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent {
  myForm: FormGroup = new FormGroup({});
  hide: boolean = true;

  loading$: Observable<boolean> = new Observable();
  users$: Observable<any> = new Observable();

  store = inject(Store<any>);
  fb = inject(FormBuilder);

  constructor () {
    this.validators();
  }

  access() {
    this.store.dispatch(login(this.myForm.value));
  }

  get input(): {[key: string]: AbstractControl} {
    return this.myForm.controls;
  }

  validators() {
    this.myForm = this.fb.group({
      email:['john@mail.com', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]],
      password:['changeme', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        // Validators.pattern('^(?=.[a-zA-Z])(?=.[0-9])[a-zA-Z0-9]+$'),
      ]]
    });
  }
}