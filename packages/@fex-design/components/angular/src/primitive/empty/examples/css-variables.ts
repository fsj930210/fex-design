import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@fex-design/angular/primitive/empty'
@Component({
  selector: 'empty-css-variables-example',
  standalone: true,
  imports: [Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class EmptyCssVariablesExample {}
