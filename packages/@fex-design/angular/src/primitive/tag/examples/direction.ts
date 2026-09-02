import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag, TagClose } from '@fex-design/angular/primitive/tag'

@Component({
  selector: 'tag-primitive-direction-example',
  standalone: true,
  imports: [Tag, TagClose],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class DirectionExample {}
