import { scrollbarConfigurationLines } from '@fex-design/docs-shared/scrollbar-demo'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { InputNumber } from '@fex-design/angular/ui/input-number'
import { Select } from '@fex-design/angular/ui/select'
import { Checkbox } from '@fex-design/angular/ui/checkbox'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, type ScrollbarAutoHide } from '@fex-design/angular/primitive/scrollbar'

@Component({
  selector: 'scrollbar-configuration-example', standalone: true,
  imports: [ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, Select, Checkbox, InputNumber],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './configuration.html',
})
export class ScrollbarConfigurationExample {
  readonly lines = scrollbarConfigurationLines
  readonly modes = [{"value":"never","label":"持续显示"},{"value":"scroll","label":"滚动时显示"},{"value":"move","label":"移动时显示"},{"value":"leave","label":"离开后隐藏"}]
  readonly mode = signal<ScrollbarAutoHide>('scroll')
  readonly delay = signal(600)
  readonly disabled = signal(false)
  readonly top = signal(0)
  changeMode(value: unknown) {
    if (value === 'never' || value === 'scroll' || value === 'move' || value === 'leave') this.mode.set(value)
  }
  scroll(top: number) { this.top.set(Math.round(top)) }
}
