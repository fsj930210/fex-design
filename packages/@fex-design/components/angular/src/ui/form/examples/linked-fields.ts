import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm, type AnyFormState, type AnyFieldApi } from '@tanstack/angular-form'
import { Form, FormField, FormSubscribe } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { RadioGroup } from '@fex-design/angular/ui/radio'
import { Select } from '@fex-design/angular/ui/select'
import { Button } from '@fex-design/angular/ui/button'
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
  imports: [Form, FormField, FormSubscribe, Input, Select, RadioGroup, Button, JsonPipe],
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
      <form uiForm [form]="form">
        <ng-template #kindLabel>账号类型</ng-template>
        <div formField [tanstackField]="form" name="kind" [label]="kindLabel" #kind="field">
          <div
            radioGroup
            [value]="kind.api.state.value"
            (onChange)="changeKind($any($event.value))"
            orientation="horizontal"
            [options]="accountKinds"
          ></div>
        </div>
        <ng-template [formSubscribe]="kindValue" let-kindValue>
          @if (kindValue === 'business') {
            <ng-template #companyLabel>公司名称</ng-template>
            <div
              formField
              [tanstackField]="form"
              name="company"
              [label]="companyLabel"
              required
              [validators]="companyValidators"
              #company="field"
            >
              <div
                input
                type="text"
                [value]="company.api.state.value"
                (onChange)="company.api.handleChange($any($event).target.value)"
                (focusout)="company.api.handleBlur()"
              ></div>
            </div>
          }
        </ng-template>
        <ng-template #regionLabel>地区</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="region"
          [label]="regionLabel"
          required
          #region="field"
        >
          <div
            select
            [value]="region.api.state.value || []"
            [options]="regions"
            (onChange)="changeRegion($event.value)"
            placeholder="请选择"
          ></div>
        </div>
        <ng-template [formSubscribe]="cityOptions" let-options>
          <ng-template #cityLabel>城市</ng-template>
          <div
            formField
            [tanstackField]="form"
            name="city"
            [label]="cityLabel"
            required
            [validators]="requiredValidators"
            #city="field"
          >
            <div
              select
              [value]="city.api.state.value || []"
              [options]="options"
              (onChange)="city.api.handleChange(selectionValue($event.value))"
              placeholder="请选择"
            ></div>
          </div>
        </ng-template>
        <ng-template #passwordLabel>密码</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="password"
          [label]="passwordLabel"
          required
          [validators]="passwordValidators"
          #password="field"
        >
          <div
            input
            type="password"
            [value]="password.api.state.value"
            (onChange)="password.api.handleChange($any($event).target.value)"
            (focusout)="password.api.handleBlur()"
          ></div>
        </div>
        <ng-template #confirmationLabel>确认密码</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="confirmation"
          [label]="confirmationLabel"
          required
          [validators]="confirmationValidators"
          #confirmation="field"
        >
          <div
            input
            type="password"
            [value]="confirmation.api.state.value"
            (onChange)="confirmation.api.handleChange($any($event).target.value)"
            (focusout)="confirmation.api.handleBlur()"
          ></div>
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
