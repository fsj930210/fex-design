import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  signal,
} from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm, TanStackField, type AnyFormState } from '@tanstack/angular-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormError,
  FormSubscribe,
} from '@fex-design/angular/primitive/form'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import { Button } from '@fex-design/angular/primitive/button'
const initialValues = {
  team: { name: '产品组' },
  members: [{ id: 'member-1', name: '林晓', email: 'lin@example.com' }],
}
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写姓名或团队名称'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
const nameValidators = { onChange: requiredText }
const emailValidators = { onChange: emailRule }
@Component({
  selector: 'section[formNestedArrayExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormRoot,
    FormField,
    FormLabel,
    FormControl,
    FormError,
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
        <h3 class="text-base font-semibold">团队与动态成员</h3>
        <p class="text-sm text-muted-foreground">
          team.name 使用嵌套对象路径；成员使用数组路径。新增和删除直接调用 TanStack
          API，每个成员用自己的 id 保持身份。
        </p>
      </header>
      <form formRoot [form]="form">
        <div
          formField
          [tanstackField]="form"
          name="team.name"
          [validators]="nameValidators"
          #teamName="field"
        >
          <label formLabel required>团队名称</label
          ><ng-container formControl
            ><div inputRoot [value]="teamName.api.state.value">
              <input
                inputControl
                (input)="teamName.api.handleChange($any($event).target.value)"
                (blur)="teamName.api.handleBlur()"
              /></div
          ></ng-container>
          <div formError></div>
        </div>
        <ng-template [formSubscribe]="members" let-members>
          <div class="grid gap-4">
            @for (member of members; track member.id; let index = $index) {
              <section
                class="grid gap-3 rounded-md border border-border p-4"
                [attr.aria-label]="'成员 ' + (index + 1)"
              >
                <div class="flex items-center justify-between gap-3">
                  <h4 class="font-medium">成员 {{ index + 1 }}</h4>
                  <button
                    button
                    type="button"
                    (click)="removeMember(index)"
                    [attr.aria-label]="'删除成员 ' + (index + 1)"
                  >
                    删除
                  </button>
                </div>
                <!-- Recreate path-bound directives when this stable member moves to another index. -->
                @for (position of [index]; track memberPath(position, 'name')) {
                  <div
                    formField
                    [tanstackField]="form"
                    [name]="memberPath(position, 'name')"
                    [validators]="nameValidators"
                    #memberName="field"
                  >
                    <label formLabel required>成员姓名</label
                    ><ng-container formControl
                      ><div inputRoot [value]="memberName.api.state.value">
                        <input
                          inputControl
                          (input)="memberName.api.handleChange($any($event).target.value)"
                          (blur)="memberName.api.handleBlur()"
                        /></div
                    ></ng-container>
                    <div formError></div>
                  </div>
                  <div
                    formField
                    [tanstackField]="form"
                    [name]="memberPath(position, 'email')"
                    [validators]="emailValidators"
                    #memberEmail="field"
                  >
                    <label formLabel required>成员邮箱</label
                    ><ng-container formControl
                      ><div inputRoot [value]="memberEmail.api.state.value">
                        <input
                          inputControl
                          (input)="memberEmail.api.handleChange($any($event).target.value)"
                          (blur)="memberEmail.api.handleBlur()"
                        /></div
                    ></ng-container>
                    <div formError></div>
                  </div>
                }
              </section>
            }
            <button button type="button" (click)="addMember()">新增成员</button>
          </div>
        </ng-template>
        <button button type="submit" variant="solid" color="primary">保存团队</button>
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
export class NestedArrayExample {
  private readonly injector = inject(Injector)
  readonly result = signal('')
  readonly nameValidators = nameValidators
  readonly emailValidators = emailValidators
  readonly form = injectForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      this.result.set('已保存 ' + value.team.name + '，成员 ' + value.members.length + ' 人')
    },
  })
  readonly members = (state: AnyFormState) => state.values?.members ?? []
  readonly values = (state: AnyFormState) => state.values
  memberPath(index: number, key: 'name' | 'email') {
    return `members[${index}].${key}` as const
  }
  addMember() {
    this.form.pushFieldValue('members', { id: crypto.randomUUID(), name: '', email: '' })
  }
  async removeMember(index: number) {
    await this.form.removeFieldValue('members', index, { dontValidate: true })
    // Angular registers the shifted path directives during rendering; validate after that boundary.
    afterNextRender(
      () => {
        void this.form.validateArrayFieldsStartingFrom('members', index, 'change')
      },
      { injector: this.injector },
    )
  }
}
