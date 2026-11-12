import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import {
  injectForm,
  TanStackField,
  type AnyFormState,
  type AnyFieldApi,
} from '@tanstack/angular-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormError,
  FormSubscribe,
} from '@fex-design/angular/primitive/form'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import { RadioGroup, Radio } from '@fex-design/angular/primitive/radio'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/angular/primitive/select'
import { Button } from '@fex-design/angular/primitive/button'
const accountKinds = [
  { value: 'personal', label: '个人账号' },
  { value: 'business', label: '企业账号' },
]
const regions = [
  { value: 'east', label: '华东' },
  { value: 'south', label: '华南' },
]
const cities = {
  east: [
    { value: 'shanghai', label: '上海' },
    { value: 'hangzhou', label: '杭州' },
  ],
  south: [
    { value: 'guangzhou', label: '广州' },
    { value: 'shenzhen', label: '深圳' },
  ],
}
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
const confirmationRule = ({ value, fieldApi }: { value: unknown; fieldApi: AnyFieldApi }) =>
  value === fieldApi.form.getFieldValue('password') && String(value).length >= 8
    ? undefined
    : '两次密码需一致且至少 8 个字符'
const companyRule = ({ value, fieldApi }: { value: unknown; fieldApi: AnyFieldApi }) =>
  fieldApi.form.getFieldValue('kind') !== 'business' || String(value ?? '').trim()
    ? undefined
    : '企业账号请填写公司名称'
const passwordRule = ({ value }: { value: unknown }) =>
  String(value).length >= 8 ? undefined : '密码至少需要 8 个字符'
const confirmationValidators = {
  onChangeListenTo: ['password'] as ['password'],
  onChange: confirmationRule,
}
const companyValidators = { onChangeListenTo: ['kind'] as ['kind'], onChange: companyRule }
@Component({
  selector: 'section[formLinkedFieldsExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormRoot,
    FormField,
    FormLabel,
    FormControl,
    FormError,
    FormSubscribe,
    InputRoot,
    InputControl,
    SelectRoot,
    SelectTrigger,
    SelectContent,
    TanStackField,
    RadioGroup,
    Radio,
    Button,
    JsonPipe,
  ],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">账号类型、地区与密码依赖</h3>
        <p class="text-sm text-muted-foreground">
          企业账号显示公司名称并要求填写；切换地区清空城市。确认密码通过 TanStack onChangeListenTo
          依赖密码，修改密码会重新校验确认字段。
        </p>
      </header>
      <form formRoot [form]="form">
        <div formField [tanstackField]="form" name="kind" #kind="field">
          <label formLabel>账号类型</label
          ><ng-container formControl
            ><div
              radioGroup
              [value]="kind.api.state.value"
              (onChange)="changeKind($any($event.value))"
              orientation="horizontal"
            >
              @for (option of accountKinds; track option.value) {
                <label class="inline-flex items-center gap-2"
                  ><button radio [value]="option.value"></button>{{ option.label }}</label
                >
              }
            </div></ng-container
          >
          <div formError></div>
        </div>
        <ng-template [formSubscribe]="kindValue" let-kindValue>
          @if (kindValue === 'business') {
            <div
              formField
              [tanstackField]="form"
              name="company"
              [validators]="companyValidators"
              #company="field"
            >
              <label formLabel required>公司名称</label
              ><ng-container formControl
                ><div inputRoot [value]="company.api.state.value">
                  <input
                    inputControl
                    type="text"
                    (input)="company.api.handleChange($any($event).target.value)"
                    (blur)="company.api.handleBlur()"
                  /></div
              ></ng-container>
              <div formError></div>
            </div>
          }
        </ng-template>
        <div formField [tanstackField]="form" name="region" #region="field">
          <label formLabel required>地区</label
          ><ng-container formControl
            ><div
              selectRoot
              [value]="region.api.state.value || []"
              [options]="regions"
              (change)="changeRegion($event.value)"
            >
              <div selectTrigger placeholder="请选择"></div>
              <div selectContent></div></div
          ></ng-container>
          <div formError></div>
        </div>
        <ng-template [formSubscribe]="cityOptions" let-options>
          <div
            formField
            [tanstackField]="form"
            name="city"
            [validators]="requiredValidators"
            #city="field"
          >
            <label formLabel required>城市</label
            ><ng-container formControl
              ><div
                selectRoot
                [value]="city.api.state.value || []"
                [options]="options"
                (change)="city.api.handleChange(selectionValue($event.value))"
              >
                <div selectTrigger placeholder="请选择"></div>
                <div selectContent></div></div
            ></ng-container>
            <div formError></div>
          </div>
        </ng-template>
        <div
          formField
          [tanstackField]="form"
          name="password"
          [validators]="passwordValidators"
          #password="field"
        >
          <label formLabel required>密码</label
          ><ng-container formControl
            ><div inputRoot [value]="password.api.state.value">
              <input
                inputControl
                type="password"
                (input)="password.api.handleChange($any($event).target.value)"
                (blur)="password.api.handleBlur()"
              /></div
          ></ng-container>
          <div formError></div>
        </div>
        <div
          formField
          [tanstackField]="form"
          name="confirmation"
          [validators]="confirmationValidators"
          #confirmation="field"
        >
          <label formLabel required>确认密码</label
          ><ng-container formControl
            ><div inputRoot [value]="confirmation.api.state.value">
              <input
                inputControl
                type="password"
                (input)="confirmation.api.handleChange($any($event).target.value)"
                (blur)="confirmation.api.handleBlur()"
              /></div
          ></ng-container>
          <div formError></div>
        </div>
        <button button type="submit" variant="solid" color="primary">保存账号</button>
        <ng-template [formSubscribe]="values" let-current>
          <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
            current | json
          }}</pre>
        </ng-template>
      </form>
      <p role="status" class="text-sm text-muted-foreground">{{ result() }}</p>
    </section>
  `,
})
export class LinkedFieldsExample {
  readonly accountKinds = accountKinds
  readonly regions = regions
  readonly companyValidators = companyValidators
  readonly confirmationValidators = confirmationValidators
  readonly requiredValidators = { onChange: requiredText }
  readonly passwordValidators = { onChange: passwordRule }
  readonly result = signal('')
  readonly form = injectForm({
    defaultValues: {
      kind: 'personal',
      company: '',
      region: 'east',
      city: '',
      password: '',
      confirmation: '',
    },
    onSubmit: ({ value }) => {
      this.result.set(
        '已保存' + (value.kind === 'business' ? '企业' : '个人') + '账号，城市：' + value.city,
      )
    },
  })
  readonly values = (state: AnyFormState) => state.values
  readonly kindValue = (state: AnyFormState) => state.values?.kind ?? 'personal'
  readonly cityOptions = (state: AnyFormState) =>
    state.values?.region === 'south' ? cities.south : cities.east
  readonly selectionValue = (value: unknown) => (typeof value === 'string' ? value : '')
  changeKind(value: string) {
    this.form.setFieldValue('kind', value)
    if (value === 'personal') this.form.setFieldValue('company', '')
  }
  changeRegion(value: unknown) {
    this.form.setFieldValue('region', typeof value === 'string' ? value : 'east')
    this.form.setFieldValue('city', '')
  }
}
