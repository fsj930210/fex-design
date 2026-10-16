import { Component } from '@angular/core'
import { AspectRatio } from '@fex-design/angular/primitive/aspect-ratio'
@Component({
  selector: 'aspect-ratio-portrait-example',
  standalone: true,
  imports: [AspectRatio],
  templateUrl: './portrait.html',
})
export class Portrait {}
