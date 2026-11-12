import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { injectForm, type AnyFormState } from '@tanstack/angular-form'
import { Form, FormField, FormSubscribe } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
@Component({
  selector: 'section[formSubmitExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, FormSubscribe, Input, Button],
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">申请产品试用</h3>
        <p class="text-sm text-muted-foreground">
          模拟请求等待 900ms。使用占用邮箱查看业务错误，修改邮箱后重试；提交期间禁止修改和重复发送。
        </p>
      </header>
      <form uiForm [form]="form">
        <ng-template [formSubscribe]="submissionState" let-state>
          <ng-template #emailLabel>申请邮箱</ng-template>
          <div
            formField
            [tanstackField]="form"
            name="email"
            [validators]="validators"
            [label]="emailLabel"
            required
            #email="field"
          >
            <div
              input
              [disabled]="state.busy"
              [value]="email.api.state.value"
              (onChange)="email.api.handleChange($any($event).target.value)"
              (focusout)="email.api.handleBlur()"
              placeholder="name@company.com"
            ></div>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button button type="submit" color="primary" variant="solid" [disabled]="state.busy">
              {{ state.busy ? '正在发送…' : '发送申请' }}
            </button>
            <button
              button
              type="button"
              [disabled]="state.busy"
              (click)="form.setFieldValue('email', 'used@example.com')"
            >
              使用占用邮箱
            </button>
          </div>
          <p role="status" class="text-sm text-muted-foreground">
            {{ state.busy ? '请求处理中，不能重复提交' : '可以提交' }}；提交尝试：{{
              state.attempts
            }}
            次（含校验未通过）
          </p>
        </ng-template>
      </form>
      <p role="status" class="rounded-md bg-muted-background p-3 text-sm">{{ receipt() }}</p>
    </section>
  `,
})
export class SubmitExample {
  readonly receipt = signal('尚未提交申请')
  readonly validators = { onChange: emailRule, onSubmit: emailRule }
  readonly submissionState = (state: AnyFormState) => ({
    busy: !!state.isSubmitting,
    attempts: state.submissionAttempts ?? 0,
  })
  readonly form = injectForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value, formApi }) => {
      this.receipt.set('正在发送申请，请等待…')
      await new Promise<void>((resolve) => setTimeout(resolve, 900))
      if (value.email === 'used@example.com') {
        formApi.setFieldMeta('email', (meta) => ({
          ...meta,
          errorMap: { ...meta.errorMap, onSubmit: '该邮箱已有申请，请更换邮箱' },
        }))
        this.receipt.set('申请未发送，请处理邮箱错误后重试')
        return
      }
      this.receipt.set('申请已发送至 ' + value.email)
    },
  })
}
