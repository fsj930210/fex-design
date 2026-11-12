import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { TanStackField } from '@tanstack/angular-form'
import { injectFormInstance } from '@fex-design/angular/primitive/form'
import {
  FormField,
  FormGroup,
  FormLegend,
  FormLabel,
  FormControl,
  FormError,
} from '@fex-design/angular/primitive/form'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
const requiredText = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请填写地址信息'
@Component({
  selector: 'div[addressFields]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormField,
    FormGroup,
    FormLegend,
    FormLabel,
    FormControl,
    FormError,
    InputRoot,
    InputControl,
    TanStackField,
  ],
  host: { class: 'contents' },
  template: `<fieldset formGroup class="rounded-lg bg-muted-background p-4">
    <legend formLegend>{{ legend() }}</legend>
    <p class="text-xs font-mono text-muted-foreground">字段前缀：{{ prefix() }}</p>
    <div
      formField
      [tanstackField]="form()"
      [name]="path('city')"
      [validators]="validators"
      #city="field"
    >
      <label formLabel required>城市</label
      ><ng-container formControl
        ><div inputRoot [value]="city.api.state.value">
          <input
            inputControl
            (input)="city.api.handleChange($any($event).target.value)"
            (blur)="city.api.handleBlur()"
          /></div
      ></ng-container>
      <div formError></div>
    </div>
    <div
      formField
      [tanstackField]="form()"
      [name]="path('street')"
      [validators]="validators"
      #street="field"
    >
      <label formLabel required>街道地址</label
      ><ng-container formControl
        ><div inputRoot [value]="street.api.state.value">
          <input
            inputControl
            (input)="street.api.handleChange($any($event).target.value)"
            (blur)="street.api.handleBlur()"
          /></div
      ></ng-container>
      <div formError></div>
    </div>
  </fieldset>`,
})
export class AddressFields {
  readonly prefix = input.required<'shipping' | 'billing'>()
  readonly legend = input.required<string>()
  readonly form = injectFormInstance()
  readonly validators = { onChange: requiredText }
  path(key: 'city' | 'street') {
    return `${this.prefix()}.${key}` as const
  }
}
