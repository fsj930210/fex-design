import { radioItemClassName, radioLabelClassName } from '@fex-design/styles/radio'
import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core'
import {
  Radio as PrimitiveRadio,
  RadioButton,
  RadioGroup as PrimitiveRadioGroup,
  type RadioValue,
} from '../../primitive/radio/radio'

let radioId = 0

@Component({
  selector: 'div[radio]',
  standalone: true,
  imports: [PrimitiveRadio],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './radio.html',
})
export class Radio {
  protected readonly controlId = `radio-${++radioId}`
  value = input.required<RadioValue>()
  disabled = input(false, { transform: booleanAttribute })
  size = input<'sm' | 'md' | 'lg'>('md')
  classNames = input<Partial<Record<'root' | 'control' | 'label', string>> | undefined>()
  styles = input<Partial<Record<'root' | 'control' | 'label', string>> | undefined>()
  protected readonly rootClassName = radioItemClassName
  protected readonly labelClassName = radioLabelClassName
}

@Component({
  selector: 'div[radioGroup]',
  standalone: true,
  imports: [Radio],
  providers: [{ provide: PrimitiveRadioGroup, useExisting: forwardRef(() => RadioGroup) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './radio-group.html',
})
export class RadioGroup extends PrimitiveRadioGroup {
  options = input<readonly { label: string; value: RadioValue; disabled?: boolean }[] | undefined>()
}

@Component({
  selector: 'div[radioButtonGroup]',
  standalone: true,
  imports: [RadioButton],
  providers: [{ provide: PrimitiveRadioGroup, useExisting: forwardRef(() => RadioButtonGroup) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'gap-0' },
  templateUrl: './radio-button-group.html',
})
export class RadioButtonGroup extends PrimitiveRadioGroup {
  options = input<readonly { label: string; value: RadioValue; disabled?: boolean }[] | undefined>()
}

export { RadioButton }
export type { RadioChangeMeta, RadioValue } from '../../primitive/radio/radio'
