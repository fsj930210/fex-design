import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import { NgTemplateOutlet } from '@angular/common'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  TemplateRef,
} from '@angular/core'
import {
  CheckboxControl,
  CheckboxGroup as PrimitiveCheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '../../primitive/checkbox/checkbox'
@Component({
  selector: 'div[checkbox]',
  standalone: true,
  imports: [CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox.html',
})
export class Checkbox {
  value = input<CheckboxValue | undefined>()
  checked = input<boolean | undefined>()
  defaultChecked = input(false, { transform: booleanAttribute })
  disabled = input(false, { transform: booleanAttribute })
  indeterminate = input(false, { transform: booleanAttribute })
  required = input(false, { transform: booleanAttribute })
  name = input<string | undefined>()
  ariaInvalid = input(false, { alias: 'aria-invalid', transform: booleanAttribute })
  ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' })
  size = input<'sm' | 'md' | 'lg'>('md')
  classNames = input<
    Partial<Record<'root' | 'control' | 'indicator' | 'label', string>> | undefined
  >()
  styles = input<Partial<Record<'root' | 'control' | 'indicator' | 'label', string>> | undefined>()
  indicator = input<TemplateRef<void> | undefined>()
}
@Component({
  selector: 'div[checkboxGroup]',
  standalone: true,
  imports: [Checkbox],
  providers: [{ provide: PrimitiveCheckboxGroup, useExisting: forwardRef(() => CheckboxGroup) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox-group.html',
})
export class CheckboxGroup extends PrimitiveCheckboxGroup {
  options = input<
    readonly { label: string; value: CheckboxValue; disabled?: boolean }[] | undefined
  >()
}
