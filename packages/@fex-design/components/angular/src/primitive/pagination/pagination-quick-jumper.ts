import type { InputVariant } from '@fex-design/core/input/types'
import { cn } from '@fex-design/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core'
import {
  paginationQuickJumperClassName,
  paginationInputControlClassName,
} from '@fex-design/components-styles/pagination'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import {
  InputNumberRoot,
  InputNumberControl,
  InputNumberActions,
  InputNumberIncrement,
  InputNumberDecrement,
} from '../input-number'
import { PaginationState } from './pagination-state'
import {
  NativeAttributesDirective,
  type NativeAttributes,
} from '@fex-design/angular/directives/native-attributes'

@Component({
  selector: 'div[paginationQuickJumper]',
  standalone: true,
  imports: [
    InputNumberRoot,
    InputNumberControl,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
    NativeAttributesDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'pagination-quick-jumper' },
  templateUrl: './pagination-quick-jumper.html',
})
export class PaginationQuickJumper {
  readonly inputActionsProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly incrementProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly decrementProps = input<Pick<NativeAttributes, 'class' | 'style'>>()
  readonly inputNumberProps = input<
    Pick<NativeAttributes, 'class' | 'style'> & { variant?: InputVariant | undefined }
  >()
  readonly class = input<string>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly inputProps = input<NativeAttributes>({})
  readonly state = inject(PaginationState)
  protected readonly hostClassName = createHostClassName(paginationQuickJumperClassName, () =>
    this.class(),
  )
  readonly inputClassName = computed(() =>
    cn(
      paginationInputControlClassName({ size: this.state.size() }),
      this.inputNumberProps()?.class,
    ),
  )
  readonly maxPage = computed(() => Math.max(1, this.state.snapshot().pageCount))
  readonly resolvedInputProps = computed(() => {
    const {
      value: _value,
      defaultValue: _defaultValue,
      disabled: _disabled,
      readOnly: _readOnly,
      type: _type,
      ...props
    } = this.inputProps()
    return {
      ...props,
      'aria-label': props['aria-label'] ?? this.state.snapshot().labels.quickJumper,
      inputmode: 'numeric',
    }
  })
  keydown(event: KeyboardEvent) {
    if (
      this.disabled() ||
      this.state.snapshot().disabled ||
      this.state.snapshot().pageCount === 0 ||
      event.defaultPrevented ||
      event.isComposing ||
      event.key !== 'Enter'
    )
      return
    event.preventDefault()
    const text = (event.target as HTMLInputElement).value
    if (text.trim()) this.state.controller.setPage(Number(text), 'jump')
  }
}
