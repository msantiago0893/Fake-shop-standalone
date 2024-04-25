import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadCategory } from 'src/app/core/store/actions/category.action';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectCategory } from 'src/app/core/store/selectors/category.selector';
import { MatIconModule } from '@angular/material/icon';
import { CategoryState } from 'src/app/core/store/reducers/category.reducer';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-detail-category',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.sass'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translatex(-100%)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ]
})
export class DetailCategoryComponent {
  idCategory: number;
  category$ = this.store.pipe(select(selectCategory));

  constructor(
    private store: Store<CategoryState>,
    private route: ActivatedRoute
  ) {
    this.idCategory = route.snapshot.params['id'];
  }

  ngOnInit(): void {

    if (this.idCategory) {
      this.getCategory();
    }
  }

  getCategory() {
    this.store.dispatch(loadCategory({id: this.idCategory}));
  }
}