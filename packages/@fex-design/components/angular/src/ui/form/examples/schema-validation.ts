import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { injectForm } from '@tanstack/angular-form'
import { z } from 'zod'
import { Form, FormField } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
const registrationSchema = z
  .object({
    email: z.email('请输入有效邮箱'),
    password: z.string().min(8, '密码至少需要 8 个字符'),
    confirmation: z.string().min(1, '请再次输入密码'),
  })
  .refine((value) => value.password === value.confirmation, {
    path: ['confirmation'],
    message: '两次输入的密码不一致',
  })
@Component({
  selector: 'section[formSchemaValidationExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, Input, Button],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">使用 Zod 校验注册信息</h3>
        <p class="text-sm text-muted-foreground">
          对象 Schema 同时校验字段格式和两次密码一致性；确认密码错误归属到对应字段。
        </p>
      </header>
      <form uiForm [form]="form">
        <ng-template #emailLabel>邮箱</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="email"
          [label]="emailLabel"
          required
          #email="field"
        >
          <div
            input
            type="email"
            [value]="email.api.state.value"
            (onChange)="email.api.handleChange($any($event).target.value)"
            (focusout)="email.api.handleBlur()"
          ></div>
        </div>
        <ng-template #passwordLabel>密码</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="password"
          [label]="passwordLabel"
          required
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
        <button button type="submit" variant="solid" color="primary">注册</button>
      </form>
      @if (result()) {
        <p role="status" class="rounded-md bg-muted-background p-3 text-sm">{{ result() }}</p>
      }
    </section>
  `,
})
export class SchemaValidationExample {
  readonly result = signal('')
  readonly form = injectForm({
    defaultValues: { email: '', password: '', confirmation: '' },
    validators: { onChange: registrationSchema, onSubmit: registrationSchema },
    onSubmit: ({ value }) => {
      this.result.set('注册校验通过：' + value.email)
    },
  })
}
