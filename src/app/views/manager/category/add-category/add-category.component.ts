import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { addCategory, loadCategory, updateCategory } from 'src/app/core/store/actions/category.action';
import { selectCategory } from 'src/app/core/store/selectors/category.selector';
import { Category } from '@model/category.model';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryState } from 'src/app/core/store/reducers/category.reducer';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatDividerModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent {
  myForm: FormGroup = new FormGroup({});
  id: any;
  fb = inject(FormBuilder);
  store = inject(Store<CategoryState>);
  route = inject(ActivatedRoute);

  constructor() {
    this.validators();

    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

    if (this.id) {
      this.getCategory();
    }
  }

  getCategory() {
    this.store.dispatch(loadCategory({id: this.id}));

    this.store.select(selectCategory)
      .subscribe((category: Category) => {
        this.myForm.patchValue(category);
      });
  }

  save() {
    this.store.dispatch(addCategory({
      category: this.myForm.value
    }));
  }

  update() {
    this.store.dispatch(updateCategory({
      category: { id: this.id, ...this.myForm.value}
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
      image: ['', [
        Validators.required
      ]]
    });
  }
}
