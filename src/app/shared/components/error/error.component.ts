import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { setError } from 'src/app/core/store/actions/app.action';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent {
  @Input() msgError: String = "" || "Ha surgido un error al realizar su solicitud";

  constructor(
    private store: Store<any>
  ) { }

  onBack() {
    this.store.dispatch(setError({isError: false}));
  }
}
