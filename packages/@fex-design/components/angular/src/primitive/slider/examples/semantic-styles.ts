import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderMark,
  SliderThumb,
} from '@fex-design/angular/primitive/slider'
@Component({
  selector: 'slider-semantic-styles-example',
  standalone: true,
  imports: [SliderRoot, SliderTrack, SliderRange, SliderMark, SliderThumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SliderSemanticStylesExample {}
