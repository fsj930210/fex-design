import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb } from '@fex-design/angular/primitive/scrollbar'

@Component({
  selector: 'scrollbar-horizontal-example', standalone: true,
  imports: [ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb], changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './horizontal.html',
})
export class ScrollbarHorizontalExample {}
