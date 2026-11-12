import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm, TanStackField, type AnyFormState } from '@tanstack/angular-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormSubscribe,
} from '@fex-design/angular/primitive/form'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import { RadioGroup, Radio } from '@fex-design/angular/primitive/radio'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'section[formEventsExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormRoot,
    FormField,
    FormLabel,
    FormControl,
    FormSubscribe,
    InputRoot,
    InputControl,
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
        <h3 class="text-base font-semibold">通知渠道与收件地址</h3>
        <p class="text-sm text-muted-foreground">
          切换渠道时在事件回调中清空地址；回填按钮根据当前渠道设置示例地址，失焦时记录当前输入。
        </p>
      </header>
      <form formRoot [form]="form">
        <div formField [tanstackField]="form" name="channel" #channel="field">
          <label formLabel>通知渠道</label
          ><ng-container formControl
            ><div
              radioGroup
              [value]="channel.api.state.value"
              (onChange)="changeChannel($any($event.value))"
              orientation="horizontal"
            >
              @for (option of channels; track option.value) {
                <label class="inline-flex items-center gap-2"
                  ><button radio [value]="option.value"></button>{{ option.label }}</label
                >
              }
            </div></ng-container
          >
        </div>
        <ng-template [formSubscribe]="selectedChannel" let-selected>
          <div class="grid gap-3">
            <div formField [tanstackField]="form" name="address" #address="field">
              <label formLabel>收件地址</label
              ><ng-container formControl
                ><div inputRoot [value]="address.api.state.value">
                  <input
                    inputControl
                    (input)="address.api.handleChange($any($event).target.value)"
                    (blur)="address.api.handleBlur(); recordBlur(address.api.state.value)"
                    [placeholder]="selected === 'email' ? '请输入邮箱地址' : '请输入手机号码'"
                  /></div
              ></ng-container>
            </div>
            <button button type="button" (click)="fillAddress()">回填当前渠道地址</button>
          </div>
        </ng-template>
        <ng-template [formSubscribe]="values" let-current>
          <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
            current | json
          }}</pre>
        </ng-template>
      </form>
      <p role="status" class="text-sm text-muted-foreground">{{ log() }}</p>
    </section>
  `,
})
export class EventsExample {
  readonly channels = [
    { value: 'email', label: '邮件' },
    { value: 'sms', label: '短信' },
  ]
  readonly log = signal('请选择通知渠道，然后填写收件地址')
  readonly form = injectForm({ defaultValues: { channel: 'email', address: '' } })
  readonly values = (state: AnyFormState) => state.values
  readonly selectedChannel = (state: AnyFormState) => state.values?.channel ?? 'email'
  changeChannel(value: string) {
    this.form.setFieldValue('channel', value)
    this.form.setFieldValue('address', '')
    this.log.set('已切换到' + (value === 'email' ? '邮件' : '短信') + '并清空收件地址')
  }
  fillAddress() {
    const value = this.form.state.values.channel === 'email' ? 'member@example.com' : '13800138000'
    this.form.setFieldValue('address', value)
    this.log.set('已回填：' + value)
  }
  recordBlur(value: string) {
    this.log.set('收件地址已失焦：' + (value || '空'))
  }
}
