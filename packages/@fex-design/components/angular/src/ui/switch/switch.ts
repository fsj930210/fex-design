import { NgTemplateOutlet } from '@angular/common'
import type {
  SwitchClassNames,
  SwitchShape,
  SwitchSize,
  SwitchStyles,
} from '@fex-design/core/switch/types'
import { switchClassName } from '@fex-design/components-styles/switch'
import { cn } from '@fex-design/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  type OnInit,
  computed,
  input,
  output,
  signal,
  type TemplateRef,
} from '@angular/core'
import { Spinner } from '@fex-design/angular/primitive/spinner'
import { SwitchContent, SwitchThumb } from '@fex-design/angular/primitive/switch'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'button[switch]',
  standalone: true,
  imports: [NgTemplateOutlet, Spinner, SwitchContent, SwitchThumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    role: 'switch',
    '[disabled]': 'disabled() || loading()',
    '[attr.aria-checked]': 'currentChecked()',
    '[attr.aria-busy]': 'loading() || null',
    '[attr.data-state]': 'currentChecked() ? "checked" : "unchecked"',
    '[attr.data-disabled]': "disabled() ? '' : null",
    '[attr.data-loading]': "loading() ? '' : null",
    '[attr.data-size]': 'size()',
    '[attr.data-shape]': 'shape()',
    '[class]': 'hostClassName()',
    '[style]': 'styles().root',
    '(click)': 'handleClick($event)',
    'data-slot': 'switch',
  },
  templateUrl: './switch.html',
})
export class Switch implements OnInit {
  readonly checked = input<boolean | undefined>()
  readonly defaultChecked = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly loading = input(false, { transform: booleanAttribute })
  readonly size = input<SwitchSize>('md')
  readonly shape = input<SwitchShape>('rounded')
  readonly checkedContent = input<string | TemplateRef<unknown> | undefined>()
  readonly uncheckedContent = input<string | TemplateRef<unknown> | undefined>()
  readonly classNames = input<SwitchClassNames>({})
  readonly styles = input<SwitchStyles<string>>({})
  readonly change = output<{ checked: boolean; event: MouseEvent }>()
  private readonly internalChecked = signal(false)
  ngOnInit() { this.internalChecked.set(this.defaultChecked()) }
  readonly currentChecked = computed(
    () => this.checked() ?? this.internalChecked(),
  )
  protected readonly hostClassName = createHostClassName(() =>
    cn(switchClassName({ size: this.size(), shape: this.shape() }), this.classNames().root),
  )
  handleClick(event: MouseEvent) {
    if (event.defaultPrevented || this.disabled() || this.loading()) return
    const checked = !this.currentChecked()
    if (this.checked() === undefined) {
      this.internalChecked.set(checked)
    }
    this.change.emit({ checked, event })
  }
  protected template(value: string | TemplateRef<unknown> | undefined) {
    return typeof value === 'string' || value === undefined ? null : value
  }
  protected text(value: string | TemplateRef<unknown> | undefined) {
    return typeof value === 'string' ? value : ''
  }
}
