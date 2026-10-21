import { getPickerAppearance } from './appearance-context'
import { cn } from '@fex-design/utils'
import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  input,
  TemplateRef,
} from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { getPickerContentKind } from '@fex-design/core/date-picker/view'
import { datePickerFooterClassName } from '@fex-design/components-styles/date-picker'
import { getFooterOwner } from './date-picker-footer-owner'
import { DatePickerToday } from './date-picker-today'
import { DatePickerCancel } from './date-picker-cancel'
import { DatePickerConfirm } from './date-picker-confirm'
export type DatePickerFooterContent = string | number | TemplateRef<unknown> | null
@Component({
  selector: 'div[datePickerFooter]',
  standalone: true,
  imports: [NgTemplateOutlet, DatePickerToday, DatePickerCancel, DatePickerConfirm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'date-picker-footer',
    '[class]': 'hostClassName()',
    '[style]': "appearance().styles?.footer ?? ''",
    '[hidden]': "kind() === 'hidden'",
    '[style.display]': "kind() === 'hidden' ? 'none' : null",
  },
  templateUrl: './date-picker-footer.html',
})
export class DatePickerFooter {
  readonly class = input<string>()
  protected readonly appearance = getPickerAppearance()
  readonly injector = inject(Injector)
  readonly content = input<DatePickerFooterContent>()
  readonly owner = getFooterOwner()
  readonly kind = computed(() => getPickerContentKind(this.content()))
  readonly template = computed(() => {
    const value = this.content()
    return value instanceof TemplateRef ? value : null
  })
  protected readonly hostClassName = createHostClassName(
    () => cn(datePickerFooterClassName, this.appearance().classNames?.footer),
    () => this.class(),
  )
}
