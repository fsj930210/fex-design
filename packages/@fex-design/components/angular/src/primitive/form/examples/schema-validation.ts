import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { injectForm, TanStackField } from '@tanstack/angular-form'
import { z } from 'zod'
import {
  FormRoot,
  FormField,
  FormControl,
  FormLabel,
  FormError,
} from '@fex-design/angular/primitive/form'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import { Button } from '@fex-design/angular/primitive/button'
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
  imports: [
    FormRoot,
    FormField,
    FormControl,
    FormLabel,
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
        <h3 class="text-base font-semibold">使用 Zod 校验注册信息</h3>
        <p class="text-sm text-muted-foreground">
          对象 Schema 同时校验字段格式和两次密码一致性；确认密码错误归属到对应字段。
        </p>
      </header>
      <form formRoot [form]="form">
        <div formField [tanstackField]="form" name="email" #email="field">
          <label formLabel required>邮箱</label
          ><ng-container formControl
            ><div inputRoot [value]="email.api.state.value">
              <input
                inputControl
                type="email"
                (input)="email.api.handleChange($any($event).target.value)"
                (blur)="email.api.handleBlur()"
              /></div
          ></ng-container>
          <div formError></div>
        </div>
        <div formField [tanstackField]="form" name="password" #password="field">
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
        <div formField [tanstackField]="form" name="confirmation" #confirmation="field">
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
