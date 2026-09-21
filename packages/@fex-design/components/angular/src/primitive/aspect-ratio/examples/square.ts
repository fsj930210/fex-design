import { Component } from '@angular/core'
import { AspectRatio } from '../aspect-ratio'
@Component({
  selector: 'aspect-ratio-square-example',
  standalone: true,
  imports: [AspectRatio],
  templateUrl: './square.html',
})
export class Square {}
