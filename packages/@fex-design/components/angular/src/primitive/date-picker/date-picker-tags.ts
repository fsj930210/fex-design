import { getPickerAppearance } from './appearance-context'
import { cn } from '@fex-design/utils'
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { getDatePickerTagItems } from '@fex-design/core/date-picker/input'
import { formatDatePickerValue } from '@fex-design/core/date-picker/value'
import { datePickerMultipleTagsClassName } from '@fex-design/components-styles/date-picker'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { Tag, TagAction } from '@fex-design/angular/primitive/tag'
import { DatePickerState } from './use-date-picker'
@Component({
  selector: 'div[datePickerTags]',
  standalone: true,
  imports: [Tag, TagAction],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'date-picker-tags',
    '[class]': 'hostClassName()',
    '[style]': "appearance().styles?.tags ?? ''",
  },
  templateUrl: './date-picker-tags.html',
})
export class DatePickerTags {
  readonly class = input<string>()
  protected readonly appearance = getPickerAppearance()
  readonly maxCount = input<number>()
  readonly state = inject(DatePickerState)
  readonly context = computed(() => this.state.context())
  protected readonly tags = computed(() =>
    getDatePickerTagItems(
      this.context().calendarValues,
      this.maxCount() ?? this.context().maxCount,
    ),
  )
  protected readonly hostClassName = createHostClassName(
    () => cn(datePickerMultipleTagsClassName, this.appearance().classNames?.tags),
    () => this.class(),
  )
  protected readonly format = formatDatePickerValue
}
