import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm, type AnyFormState } from '@tanstack/angular-form'
import { Form, FormField, FormSubscribe } from '@fex-design/angular/ui/form'
import { Button } from '@fex-design/angular/ui/button'
import { PhoneControl, type PhoneValue } from './_phone-control'
const phoneRule = ({ value }: { value: PhoneValue }) =>
  (value.countryCode === '+86' ? /^\d{11}$/ : /^\d{8}$/).test(value.number)
    ? undefined
    : '请输入有效手机号：+86 为 11 位，+852 为 8 位'
@Component({
  selector: 'section[formCustomControlExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, FormSubscribe, Button, PhoneControl, JsonPipe],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">自定义手机号控件</h3>
        <p class="text-sm text-muted-foreground">
          控件返回包含区号和号码的对象，调用方显式连接
          value、变更和失焦。点击区号切换规则并清空号码，无需 getValueProps 或事件转换配置。
        </p>
      </header>
      <form uiForm [form]="form">
        <ng-template #phoneLabel>手机号</ng-template
        ><ng-template #phoneDescription>点击区号按钮切换；切换后重新填写号码。</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="phone"
          [validators]="validators"
          [label]="phoneLabel"
          [description]="phoneDescription"
          required
          #phone="field"
        >
          <div
            phoneControl
            [value]="phone.api.state.value"
            (valueChange)="phone.api.handleChange($event)"
            (blurred)="phone.api.handleBlur()"
          ></div>
        </div>
        <div class="flex flex-wrap gap-3">
          <button button type="submit" variant="solid" color="primary">保存手机号</button
          ><button button type="button" (click)="resetPhone()">重置控件</button>
        </div>
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
export class CustomControlExample {
  readonly result = signal('')
  readonly validators = { onChange: phoneRule }
  readonly form = injectForm({
    defaultValues: { phone: { countryCode: '+86', number: '' } as PhoneValue },
    onSubmit: ({ value }) => {
      this.result.set('已保存手机号：' + value.phone.countryCode + ' ' + value.phone.number)
    },
  })
  readonly values = (state: AnyFormState) => state.values
  resetPhone() {
    this.form.reset()
    this.result.set('')
  }
}
