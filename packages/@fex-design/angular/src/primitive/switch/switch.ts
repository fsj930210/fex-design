import type { SwitchShape, SwitchSize, SwitchState } from '@fex-design/core/switch/types'
import {
  switchClassName,
  switchContentClassName,
  switchThumbClassName,
} from '@fex-design/styles/switch'
import { cn } from '@fex/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core'
import { createHostClassName } from '../../signals/host-class'
export type { SwitchShape, SwitchSize, SwitchState }

@Component({
  selector: 'button[switch]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    role: 'switch',
    '[disabled]': 'disabled() || loading()',
    '[attr.aria-checked]': 'currentChecked()',
    '[attr.aria-busy]': 'loading() || null',
    '[attr.data-state]': 'state()',
    '[attr.data-disabled]': "disabled() ? '' : null",
    '[attr.data-loading]': "loading() ? '' : null",
    '[attr.data-size]': 'size()',
    '[attr.data-shape]': 'shape()',
    '[class]': 'hostClassName()',
    '(click)': 'handleClick($event)',
    'data-slot': 'switch',
  },
  template: '<ng-content />',
})
export class SwitchRoot {
  readonly checked = input<boolean | undefined>()
  readonly defaultChecked = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly loading = input(false, { transform: booleanAttribute })
  readonly size = input<SwitchSize>('md')
  readonly shape = input<SwitchShape>('rounded')
  readonly change = output<{ checked: boolean; event: MouseEvent }>()
  private readonly hasInteracted = signal(false)
  private readonly internalChecked = signal(false)
  readonly currentChecked = computed(
    () => this.checked() ?? (this.hasInteracted() ? this.internalChecked() : this.defaultChecked()),
  )
  readonly state = computed<SwitchState>(() => (this.currentChecked() ? 'checked' : 'unchecked'))
  protected readonly hostClassName = createHostClassName(() =>
    cn(switchClassName({ size: this.size(), shape: this.shape() })),
  )
  handleClick(event: MouseEvent) {
    if (event.defaultPrevented || this.disabled() || this.loading()) return
    const checked = !this.currentChecked()
    if (this.checked() === undefined) {
      this.hasInteracted.set(true)
      this.internalChecked.set(checked)
    }
    this.change.emit({ checked, event })
  }
}

@Component({
  selector: 'span[switchThumb]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'aria-hidden': 'true', 'data-slot': 'switch-thumb' },
  template: '<ng-content />',
})
export class SwitchThumb {
  protected readonly hostClassName = createHostClassName(switchThumbClassName)
}

@Component({
  selector: 'span[switchContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-state]': 'state()',
    '[class]': 'hostClassName()',
    'aria-hidden': 'true',
    'data-slot': 'switch-content',
  },
  template: '<ng-content />',
})
export class SwitchContent {
  readonly state = input.required<SwitchState>()
  protected readonly hostClassName = createHostClassName(switchContentClassName)
}
