import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  signal,
} from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm, type AnyFormState } from '@tanstack/angular-form'
import { Form, FormField, FormSubscribe } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
const initialValues = {
  groups: [
    {
      id: 'group-1',
      name: '产品组',
      members: [{ id: 'member-1', name: '林晓', email: 'lin@example.com' }],
    },
  ],
}
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写名称'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
const nameValidators = { onChange: requiredText }
const emailValidators = { onChange: emailRule }
@Component({
  selector: 'section[formNestedFieldsExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, FormSubscribe, Input, Button, JsonPipe],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">动态分组与嵌套成员</h3>
        <p class="text-sm text-muted-foreground">
          外层分组和内层成员均可增删。每一层以数据 id
          保持身份，字段路径使用当前数组位置；删除前一项后继续编辑和校验。
        </p>
      </header>
      <form uiForm [form]="form">
        <ng-template [formSubscribe]="groups" let-groups>
          <div class="grid gap-4">
            @for (group of groups; track group.id; let groupIndex = $index) {
              <section
                class="grid gap-4 rounded-lg bg-muted-background p-4"
                [attr.aria-label]="'分组 ' + (groupIndex + 1)"
              >
                <div class="flex items-center justify-between gap-3">
                  <h4 class="font-semibold">分组 {{ groupIndex + 1 }}</h4>
                  <button
                    button
                    type="button"
                    (click)="removeGroup(groupIndex)"
                    [attr.aria-label]="'删除分组 ' + (groupIndex + 1)"
                  >
                    删除分组
                  </button>
                </div>
                @for (position of [groupIndex]; track groupPath(position)) {
                  <ng-template #groupNameLabel>分组名称</ng-template>
                  <div
                    formField
                    [tanstackField]="form"
                    [name]="groupPath(position)"
                    [validators]="nameValidators"
                    #groupName="field"
                    [label]="groupNameLabel"
                    required
                  >
                    <div
                      input
                      [value]="groupName.api.state.value"
                      (onChange)="groupName.api.handleChange($any($event).target.value)"
                      (focusout)="groupName.api.handleBlur()"
                    ></div>
                  </div>
                  @for (member of group.members; track member.id; let memberIndex = $index) {
                    <section
                      class="grid gap-3 rounded-md border border-border p-3"
                      [attr.aria-label]="'成员 ' + (memberIndex + 1)"
                    >
                      <div class="flex items-center justify-between gap-3">
                        <h5 class="font-medium">成员 {{ memberIndex + 1 }}</h5>
                        <button
                          button
                          type="button"
                          (click)="removeMember(position, memberIndex)"
                          [attr.aria-label]="'删除成员 ' + (memberIndex + 1)"
                        >
                          删除成员
                        </button>
                      </div>
                      @for (
                        memberPosition of [memberIndex];
                        track 'members[' + memberPosition + ']'
                      ) {
                        <ng-template #memberNameLabel>成员姓名</ng-template>
                        <div
                          formField
                          [tanstackField]="form"
                          [name]="memberPath(position, memberPosition, 'name')"
                          [validators]="nameValidators"
                          #memberName="field"
                          [label]="memberNameLabel"
                          required
                        >
                          <div
                            input
                            [value]="memberName.api.state.value"
                            (onChange)="memberName.api.handleChange($any($event).target.value)"
                            (focusout)="memberName.api.handleBlur()"
                          ></div>
                        </div>
                        <ng-template #memberEmailLabel>成员邮箱</ng-template>
                        <div
                          formField
                          [tanstackField]="form"
                          [name]="memberPath(position, memberPosition, 'email')"
                          [validators]="emailValidators"
                          #memberEmail="field"
                          [label]="memberEmailLabel"
                          required
                        >
                          <div
                            input
                            [value]="memberEmail.api.state.value"
                            (onChange)="memberEmail.api.handleChange($any($event).target.value)"
                            (focusout)="memberEmail.api.handleBlur()"
                          ></div>
                        </div>
                      }
                    </section>
                  }
                  <button
                    button
                    type="button"
                    (click)="addMember(position)"
                    [attr.aria-label]="'为分组 ' + (position + 1) + ' 新增成员'"
                  >
                    新增成员
                  </button>
                }
              </section>
            }
          </div>
        </ng-template>
        <div class="flex flex-wrap gap-3">
          <button button type="button" (click)="addGroup()">新增分组</button
          ><button button type="submit" variant="solid" color="primary">保存所有分组</button
          ><button button type="button" (click)="resetGroups()">重置所有分组</button>
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
export class NestedFieldsExample {
  private readonly injector = inject(Injector)
  readonly result = signal('')
  readonly nameValidators = nameValidators
  readonly emailValidators = emailValidators
  readonly form = injectForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      this.result.set(
        '已保存 ' +
          value.groups.length +
          ' 个分组，' +
          value.groups.reduce((sum, group) => sum + group.members.length, 0) +
          ' 位成员',
      )
    },
  })
  readonly groups = (state: AnyFormState) => state.values?.groups ?? []
  readonly values = (state: AnyFormState) => state.values
  groupPath(index: number) {
    return `groups[${index}].name` as const
  }
  memberPath(groupIndex: number, memberIndex: number, key: 'name' | 'email') {
    return `groups[${groupIndex}].members[${memberIndex}].${key}` as const
  }
  addGroup() {
    this.form.pushFieldValue('groups', { id: crypto.randomUUID(), name: '', members: [] })
  }
  addMember(groupIndex: number) {
    this.form.pushFieldValue(`groups[${groupIndex}].members`, {
      id: crypto.randomUUID(),
      name: '',
      email: '',
    })
  }
  async removeGroup(index: number) {
    await this.form.removeFieldValue('groups', index, { dontValidate: true })
    // Shifted field directives register during Angular rendering; validate after they mount.
    afterNextRender(
      () => {
        void this.form.validateArrayFieldsStartingFrom('groups', index, 'change')
      },
      { injector: this.injector },
    )
  }
  async removeMember(groupIndex: number, memberIndex: number) {
    const path = `groups[${groupIndex}].members` as const
    await this.form.removeFieldValue(path, memberIndex, { dontValidate: true })
    // The nested array uses the same rendering boundary as the outer array.
    afterNextRender(
      () => {
        void this.form.validateArrayFieldsStartingFrom(path, memberIndex, 'change')
      },
      { injector: this.injector },
    )
  }
  resetGroups() {
    this.form.reset()
    this.result.set('')
  }
}
