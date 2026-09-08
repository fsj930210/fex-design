import { NgTemplateOutlet } from '@angular/common'
import type { InputClassNames as InputClassNamesBase, InputSearchMeta, InputSize, InputStyles as InputStylesBase, InputVariant } from '@fex-design/core/input/types'
import { inputActionClassName, inputGroupClassName, inputSearchAddonClassName } from '@fex-design/styles/input'
import { booleanAttribute, ChangeDetectionStrategy, Component, Directive, input, output, signal, type TemplateRef, viewChild } from '@angular/core'
import { EyeIcon } from '../../icon/eye'
import { EyeOffIcon } from '../../icon/eye-off'
import { LoadingIcon } from '../../icon/loading'
import { SearchIcon } from '../../icon/search'
import { Button } from '../button/button'
import { InputAddonAfter, InputAddonBefore, InputClear, InputControl, InputGroup, InputPrefix, InputRoot, InputSuffix } from '../../primitive/input/input'

export type InputClassNames = InputClassNamesBase
export type InputStyles = InputStylesBase<string>

@Directive()
abstract class InputBase {
  readonly value = input<string>()
  readonly defaultValue = input('')
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly readOnly = input(false, { transform: booleanAttribute })
  readonly clearable = input(false, { transform: booleanAttribute })
  readonly size = input<InputSize>('md')
  readonly variant = input<InputVariant>('outlined')
  readonly placeholder = input<string>()
  readonly name = input<string>()
  readonly autocomplete = input<string>()
  readonly ariaInvalid = input<boolean | 'true' | 'false'>(false, { alias: 'aria-invalid' })
  readonly prefix = input<string | TemplateRef<unknown> | null>()
  readonly suffix = input<string | TemplateRef<unknown> | null>()
  readonly addonBefore = input<string | TemplateRef<unknown> | null>()
  readonly addonAfter = input<string | TemplateRef<unknown> | null>()
  readonly classNames = input<InputClassNames>({})
  readonly styles = input<InputStyles>({})
  readonly valueChange = output<string>()
  readonly cleared = output<void>({ alias: 'clear' })
  protected readonly root = viewChild(InputRoot)
  protected readonly control = viewChild(InputControl)
  protected readonly groupClassName = inputGroupClassName
  protected template(value: string | TemplateRef<unknown> | null | undefined) { return typeof value === 'string' || value == null ? null : value }
  protected text(value: string | TemplateRef<unknown> | null | undefined) { return typeof value === 'string' ? value : '' }
  focus(options?: FocusOptions) { this.control()?.focus(options) }
  blur() { this.control()?.blur() }
  select() { this.control()?.select() }
}

@Component({ selector: 'div[input]', standalone: true, imports: [NgTemplateOutlet, InputAddonBefore, InputAddonAfter, InputClear, InputControl, InputPrefix, InputRoot, InputSuffix], changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'groupClassName', 'data-slot': 'input-group', role: 'group' }, templateUrl: './input.html' })
export class Input extends InputBase { readonly type = input('text') }

@Component({ selector: 'div[inputPassword]', standalone: true, imports: [NgTemplateOutlet, InputAddonBefore, InputAddonAfter, InputClear, InputControl, InputPrefix, InputRoot, InputSuffix, EyeIcon, EyeOffIcon], changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'groupClassName', 'data-slot': 'input-group', role: 'group' }, templateUrl: './input-password.html' })
export class InputPassword extends InputBase {
  readonly visibilityToggle = input(true, { transform: booleanAttribute })
  protected readonly visible = signal(false)
  protected readonly actionClassName = inputActionClassName
  protected toggleVisibility() { this.visible.update(value => !value) }
}

@Component({ selector: 'div[inputSearch]', standalone: true, imports: [NgTemplateOutlet, InputClear, InputControl, InputPrefix, InputRoot, InputSuffix, LoadingIcon, SearchIcon, Button], changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'groupClassName', 'data-slot': 'input-group', role: 'group' }, templateUrl: './input-search.html' })
export class InputSearch extends InputBase {
  readonly loading = input(false, { transform: booleanAttribute })
  readonly search = output<{ value: string; meta: InputSearchMeta }>()
  protected readonly actionClassName = inputActionClassName
  protected readonly searchAddonClassName = inputSearchAddonClassName
  protected runSearch(source: InputSearchMeta['source']) { if (!this.loading()) this.search.emit({ value: this.root()?.currentValue() ?? '', meta: { source } }) }
  protected keydown(event: KeyboardEvent) { if (event.key === 'Enter' && !event.defaultPrevented) this.runSearch('enter') }
}

export { InputGroup }
