import { Component } from '@angular/core'
import { Kbd, KbdGroup } from '@fex-design/angular/primitive/kbd'
@Component({
  selector: 'kbd-ui-group-example',
  standalone: true,
  imports: [Kbd, KbdGroup],
  templateUrl: './group.html',
})
export class Group {}
