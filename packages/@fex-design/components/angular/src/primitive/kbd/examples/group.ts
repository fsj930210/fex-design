import { Component } from '@angular/core'
import { Kbd, KbdGroup } from '..'
@Component({
  selector: 'kbd-group-example',
  standalone: true,
  imports: [Kbd, KbdGroup],
  templateUrl: './group.html',
})
export class Group {}
