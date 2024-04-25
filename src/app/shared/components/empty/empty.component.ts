import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.sass']
})
export class EmptyComponent {
  @Input() msg: String = "";
}
