import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { injectForm } from '@tanstack/angular-form'
import { Form, FormField } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
const nameRule = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请输入账号名称'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
@Component({
  selector: 'section[formDirectionExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, Input, Button],
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
        uiForm
        [form]="form"
        [attr.dir]="direction()"
        layout="horizontal"
        labelAlign="end"
        labelWidth="8rem"
        [labelWrap]="true"
      >
        <ng-template #accountLabel>账号名称</ng-template
        ><ng-template #accountDescription>说明和错误始终与控件列对齐。</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="account"
          [label]="accountLabel"
          [description]="accountDescription"
          required
          [validators]="nameValidators"
          #account="field"
        >
          <div
            input
            [value]="account.api.state.value"
            (onChange)="account.api.handleChange($any($event).target.value)"
            (focusout)="account.api.handleBlur()"
          ></div>
        </div>
        <ng-template #emailLabel>团队通知联系邮箱</ng-template
        ><ng-template #emailDescription>长标签允许换行，方向切换保留输入内容。</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="email"
          [label]="emailLabel"
          [description]="emailDescription"
          required
          [validators]="emailValidators"
          #email="field"
        >
          <div
            input
            [value]="email.api.state.value"
            (onChange)="email.api.handleChange($any($event).target.value)"
            (focusout)="email.api.handleBlur()"
          ></div>
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
