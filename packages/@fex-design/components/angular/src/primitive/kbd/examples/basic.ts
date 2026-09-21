import { Component } from '@angular/core'
import { Kbd } from '../kbd'
@Component({
  selector: 'kbd-basic-example',
  standalone: true,
  imports: [Kbd],
  templateUrl: './basic.html',
})
export class Basic {}
