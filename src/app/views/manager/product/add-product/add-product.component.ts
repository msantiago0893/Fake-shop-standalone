import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addProduct, loadProduct } from 'src/app/core/store/actions/product.action';
import { loadCategories } from 'src/app/core/store/actions/category.action';
import { selectCategories } from 'src/app/core/store/selectors/category.selector';
import { selectProduct } from 'src/app/core/store/selectors/products.selector';
import { Category, Product } from '@model/product.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatDividerModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent {
  myForm: FormGroup = new FormGroup({});
  idProduct: any;
  categories: Array<Category> = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    this.validators();

    this.idProduct = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCategories();

    if (this.idProduct) {
      this.getProduct();
    }
  }

  getProduct() {
    this.store.dispatch(loadProduct({ id: this.idProduct }));

    this.store.select(selectProduct)
      .subscribe((product: Product) => {
        this.myForm.patchValue({
          categoryId: product.category.id,
          ...product
        });
      });
  }

  getCategories() {
    this.store.dispatch(loadCategories());

    this.store.select(selectCategories)
      .subscribe((categories: any) => {
        this.categories = categories;
      });
  }

  save() {
    const { title, price, description, categoryId, image } = this.myForm.value;

    const product = {
      title,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: [image]
    }

    if (this.idProduct) {
      this.store.dispatch(addProduct({
        product
      }));
    } else {
      this.store.dispatch(addProduct({
        product: { id: this.idProduct, ...product }
      }));
    }
  }

  get input(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  validators() {
    this.myForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      price: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      categoryId: ['', [
        Validators.required
      ]],
      image: ['', [
        Validators.required
      ]]
    });
  }
}