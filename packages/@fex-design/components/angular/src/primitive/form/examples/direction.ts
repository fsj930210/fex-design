import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { injectForm, TanStackField } from '@tanstack/angular-form'
import {
  FormRoot,
  FormField,
  FormControl,
  FormLabel,
  FormDescription,
  FormError,
} from '@fex-design/angular/primitive/form'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import { Button } from '@fex-design/angular/primitive/button'
const nameRule = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请输入账号名称'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
@Component({
  selector: 'section[formDirectionExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormRoot,
    FormField,
    FormControl,
    FormLabel,
    FormDescription,
    FormError,
    InputRoot,
    InputControl,
    TanStackField,
    Button,
  ],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">LTR 与 RTL 表单方向</h3>
        <p class="text-sm text-muted-foreground">
          切换原生
          dir，观察横向布局的标签列、说明、错误与操作区如何镜像；切换方向保留当前值和校验状态。
        </p>
      </header>
      <div class="flex items-center gap-3">
        <button button type="button" (click)="toggleDirection()">
          切换为 {{ direction() === 'ltr' ? 'RTL' : 'LTR' }}</button
        ><span>当前方向：{{ direction().toUpperCase() }}</span>
      </div>
      <form
        formRoot
        [form]="form"
        [attr.dir]="direction()"
        layout="horizontal"
        labelAlign="end"
        labelWidth="8rem"
        [labelWrap]="true"
      >
        <div
          formField
          [tanstackField]="form"
          name="account"
          [validators]="nameValidators"
          #account="field"
        >
          <label formLabel required>账号名称</label
          ><ng-container formControl
            ><div inputRoot [value]="account.api.state.value">
              <input
                inputControl
                (input)="account.api.handleChange($any($event).target.value)"
                (blur)="account.api.handleBlur()"
              /></div
          ></ng-container>
          <p formDescription>说明和错误始终与控件列对齐。</p>
          <div formError></div>
        </div>
        <div
          formField
          [tanstackField]="form"
          name="email"
          [validators]="emailValidators"
          #email="field"
        >
          <label formLabel required>团队通知联系邮箱</label
          ><ng-container formControl
            ><div inputRoot [value]="email.api.state.value">
              <input
                inputControl
                (input)="email.api.handleChange($any($event).target.value)"
                (blur)="email.api.handleBlur()"
              /></div
          ></ng-container>
          <p formDescription>长标签允许换行，方向切换保留输入内容。</p>
          <div formError></div>
        </div>
        <div data-slot="form-actions" class="flex flex-wrap gap-3">
          <button button type="submit" variant="solid" color="primary">保存账号</button>
        </div>
      </form>
      <p role="status" class="text-sm text-muted-foreground">{{ result() }}</p>
    </section>
  `,
})
export class DirectionExample {
  readonly direction = signal<'ltr' | 'rtl'>('ltr')
  readonly result = signal('')
  readonly nameValidators = { onChange: nameRule }
  readonly emailValidators = { onChange: emailRule }
  readonly form = injectForm({
    defaultValues: { account: '', email: '' },
    onSubmit: ({ value }) => {
      this.result.set('已保存账号：' + value.account)
    },
  })
  toggleDirection() {
    this.direction.update((direction) => (direction === 'ltr' ? 'rtl' : 'ltr'))
  }
}
