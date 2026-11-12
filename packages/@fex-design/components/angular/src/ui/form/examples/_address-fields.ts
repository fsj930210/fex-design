import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { injectFormInstance } from '@fex-design/angular/primitive/form'
import { FormField, FormGroup } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
const requiredText = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请填写地址信息'
@Component({
  selector: 'div[addressFields]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, FormGroup, Input],
  host: { class: 'contents' },
  template: `<fieldset formGroup class="rounded-lg bg-muted-background p-4" [legend]="legend()">
    <p class="text-xs font-mono text-muted-foreground">字段前缀：{{ prefix() }}</p>
    <ng-template #cityLabel>城市</ng-template>
    <div
      formField
      [tanstackField]="form()"
      [name]="path('city')"
      [label]="cityLabel"
      required
      [validators]="validators"
      #city="field"
    >
      <div
        input
        [value]="city.api.state.value"
        (onChange)="city.api.handleChange($any($event).target.value)"
        (focusout)="city.api.handleBlur()"
      ></div>
    </div>
    <ng-template #streetLabel>街道地址</ng-template>
    <div
      formField
      [tanstackField]="form()"
      [name]="path('street')"
      [label]="streetLabel"
      required
      [validators]="validators"
      #street="field"
    >
      <div
        input
        [value]="street.api.state.value"
        (onChange)="street.api.handleChange($any($event).target.value)"
        (focusout)="street.api.handleBlur()"
      ></div>
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
