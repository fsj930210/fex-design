import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm, TanStackField, type AnyFormState } from '@tanstack/angular-form'
import {
  FormRoot,
  FormField,
  FormControl,
  FormLabel,
  FormSubscribe,
} from '@fex-design/angular/primitive/form'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import { Button } from '@fex-design/angular/primitive/button'

const initialProfile = { name: '林晓', email: 'lin@example.com' }
const loadedProfile = { name: '陈晨', email: 'chen@example.com' }
@Component({
  selector: 'section[formDirtyStateExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormRoot,
    FormField,
    FormControl,
    FormLabel,
    FormSubscribe,
    InputRoot,
    InputControl,
    TanStackField,
    Button,
    JsonPipe,
  ],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">编辑状态与初始值比较</h3>
        <p class="text-sm text-muted-foreground">
          isDirty 记录是否编辑过；isDefaultValue
          比较当前值与初始值。改回初始值不会清除编辑记录，重置状态会清除。
        </p>
      </header>
      <form formRoot [form]="form">
        <div formField [tanstackField]="form" name="name" #name="field">
          <label formLabel>姓名</label
          ><ng-container formControl
            ><div inputRoot [value]="name.api.state.value">
              <input
                inputControl
                (input)="name.api.handleChange($any($event).target.value)"
                (blur)="name.api.handleBlur()"
              /></div
          ></ng-container>
        </div>
        <div formField [tanstackField]="form" name="email" #email="field">
          <label formLabel>邮箱</label
          ><ng-container formControl
            ><div inputRoot [value]="email.api.state.value">
              <input
                inputControl
                (input)="email.api.handleChange($any($event).target.value)"
                (blur)="email.api.handleBlur()"
              /></div
          ></ng-container>
        </div>
        <div class="flex flex-wrap gap-3">
          <button button type="button" (click)="fillProfile()">填入修改值</button>
          <button button type="button" (click)="resetName()">改回初始值</button>
          <button button type="button" (click)="resetAll()">重置状态</button>
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
export class DirtyStateExample {
  readonly action = signal('当前为初始化资料')
  readonly form = injectForm({ defaultValues: initialProfile })
  readonly values = (state: AnyFormState) => ({
    values: state.values,
    isDirty: !!state.isDirty,
    isDefaultValue: state.isDefaultValue ?? true,
    isTouched: !!state.isTouched,
  })
  fillProfile() {
    this.form.setFieldValue('name', loadedProfile.name)
    this.form.setFieldValue('email', loadedProfile.email)
    this.action.set('已填入修改值，观察 isDirty 与 isDefaultValue')
  }
  resetName() {
    this.form.setFieldValue('name', initialProfile.name)
    this.form.setFieldValue('email', initialProfile.email)
    this.action.set('已改回初始值，编辑记录仍保留')
  }
  resetAll() {
    this.form.reset()
    this.action.set('已重置值与编辑状态')
  }
}
