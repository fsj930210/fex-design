import { scrollbarViewportLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
} from '@fex-design/angular/primitive/scrollbar'
import { Button } from '@fex-design/angular/ui/button'

@Component({
  selector: 'scrollbar-viewport-example',
  standalone: true,
  imports: [ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './viewport.html',
})
export class ScrollbarViewportExample {
  readonly lines = scrollbarViewportLines
  readonly viewport = viewChild(ScrollbarViewport)
  readonly lastKey = signal('尚未按键')
  top() {
    this.viewport()?.element.scrollTo({ top: 0 })
  }
  step() {
    this.viewport()?.element.scrollBy({ top: 120 })
  }
  bottom() {
    const element = this.viewport()?.element
    element?.scrollTo({ top: element.scrollHeight })
  }
}
