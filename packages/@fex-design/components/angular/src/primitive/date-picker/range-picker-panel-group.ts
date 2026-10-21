import { DatePickerTimePanel } from './date-picker-time-panel'
import { getPickerAppearance } from './appearance-context'
import { cn } from '@fex-design/utils'
import { listenNativeEvent } from '@fex-design/angular/directives/listen-native-event'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  TemplateRef,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { getVisibleRangePanelViewDates } from '@fex-design/core/date-picker/panel'
import { datePickerPanelsClassName } from '@fex-design/components-styles/date-picker'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { RangePickerPanel } from './range-picker-panel'
import { RangePickerState } from './use-range-picker'
@Component({
  selector: 'div[rangePickerPanelGroup]',
  standalone: true,
  imports: [NgTemplateOutlet, RangePickerPanel, DatePickerTimePanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    'data-slot': 'range-picker-panel-group',
    '[class]': 'hostClassName()',
    '[style]': "appearance().styles?.panelGroup ?? ''",
  },
  templateUrl: './range-picker-panel-group.html',
})
export class RangePickerPanelGroup {
  readonly class = input<string>()
  protected readonly appearance = getPickerAppearance()
  constructor() {
    listenNativeEvent('mouseleave', (event) => this.leave(event))
  }
  readonly panelCount = input<1 | 2>(2)
  readonly state = inject(RangePickerState)
  readonly template = contentChild<TemplateRef<unknown>>(TemplateRef)
  protected readonly hostClassName = createHostClassName(
    () => cn(datePickerPanelsClassName, this.appearance().classNames?.panelGroup),
    () => this.class(),
  )
  readonly viewDates = computed(() => {
    const state = this.state.context()
    return getVisibleRangePanelViewDates(
      state.viewDate,
      state.panel,
      state.showTime ? 1 : this.panelCount(),
    )
  })
  leave(event: Event) {
    if (!event.defaultPrevented) this.state.setHoverValue(null)
  }
}
