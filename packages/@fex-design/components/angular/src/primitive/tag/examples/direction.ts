import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag, TagAction } from '@fex-design/angular/primitive/tag'

@Component({
  selector: 'tag-primitive-direction-example',
  standalone: true,
  imports: [Tag, TagAction],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class DirectionExample {}
