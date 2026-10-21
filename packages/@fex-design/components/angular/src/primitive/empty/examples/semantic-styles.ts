import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@fex-design/angular/primitive/empty'
@Component({
  selector: 'empty-semantic-styles-example',
  standalone: true,
  imports: [Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class EmptySemanticStylesExample {}
