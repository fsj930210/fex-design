import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  SpinnerContainer,
  SpinnerOverlay,
  Spinner,
  SpinnerText,
} from '@fex-design/angular/primitive/spinner'
@Component({
  selector: 'spinner-semantic-styles-example',
  standalone: true,
  imports: [SpinnerContainer, SpinnerOverlay, Spinner, SpinnerText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SpinnerSemanticStylesExample {}
