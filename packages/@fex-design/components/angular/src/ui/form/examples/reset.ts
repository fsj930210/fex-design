import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm, type AnyFormState } from '@tanstack/angular-form'
import { Form, FormField, FormSubscribe } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'

const initialProfile = { name: '林晓', email: 'lin@example.com' }
const loadedProfile = { name: '陈晨', email: 'chen@example.com' }
@Component({
  selector: 'section[formResetExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, FormSubscribe, Input, Button, JsonPipe],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">资料回填与重置</h3>
        <p class="text-sm text-muted-foreground">
          回填只修改当前值；重置姓名只恢复姓名，重置全部恢复初始化资料和字段状态。
        </p>
      </header>
      <form uiForm [form]="form">
        <ng-template #nameLabel>姓名</ng-template>
        <div formField [tanstackField]="form" name="name" [label]="nameLabel" #name="field">
          <div
            input
            [value]="name.api.state.value"
            (onChange)="name.api.handleChange($any($event).target.value)"
            (focusout)="name.api.handleBlur()"
          ></div>
        </div>
        <ng-template #emailLabel>邮箱</ng-template>
        <div formField [tanstackField]="form" name="email" [label]="emailLabel" #email="field">
          <div
            input
            [value]="email.api.state.value"
            (onChange)="email.api.handleChange($any($event).target.value)"
            (focusout)="email.api.handleBlur()"
          ></div>
        </div>
        <div class="flex flex-wrap gap-3">
          <button button type="button" (click)="fillProfile()">回填资料</button>
          <button button type="button" (click)="resetName()">仅重置姓名</button>
          <button button type="button" (click)="resetAll()">重置全部</button>
        </div>
        <ng-template [formSubscribe]="values" let-current>
          <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
            current | json
          }}</pre>
        </ng-template>
      </form>
      <p role="status" class="text-sm text-muted-foreground">{{ action() }}</p>
    </section>
  `,
})
export class ResetExample {
  readonly action = signal('当前为初始化资料')
  readonly form = injectForm({ defaultValues: initialProfile })
  readonly values = (state: AnyFormState) => state.values
  fillProfile() {
    this.form.setFieldValue('name', loadedProfile.name)
    this.form.setFieldValue('email', loadedProfile.email)
    this.action.set('已回填陈晨的资料，初始化值仍为林晓')
  }
  resetName() {
    this.form.resetField('name')
    this.action.set('已重置姓名，邮箱保持当前值')
  }
  resetAll() {
    this.form.reset()
    this.action.set('已恢复全部初始化资料')
  }
}
