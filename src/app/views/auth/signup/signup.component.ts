import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderComponent } from '@components/header/header.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, HeaderComponent, MatRadioModule, MatIconModule ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {
  hide = true;
  myForm: FormGroup = new FormGroup({});
  fb = inject(FormBuilder);

  constructor() {
    this.validators();
  }

  get input(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  save() {
    console.log(this.myForm.value);
  }

  validators() {
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(100)
      ]],
      firstName: ['', [
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(100)
      ]],
      secondtName: ['', [
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(100)
      ]],
      gender: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.maxLength(50),
        Validators.minLength(8)
      ]],
      calendar: ['', [
        Validators.required
      ]],
      telephone: ['', [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      cellPhone: ['', [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      country: ['', [
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(100)
      ]],
      state: ['', [
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(100)
      ]],
      city: ['', [
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(100)
      ]],
      municipality: ['', [
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(100)
      ]],
      cologne: ['', [
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(100)
      ]],
      postalCode: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.maxLength(10)
      ]],
      street: ['', [
        Validators.required,
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        Validators.maxLength(100)
      ]],
    });
  }

}