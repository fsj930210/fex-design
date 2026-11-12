import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core'
import { injectForm } from '@tanstack/angular-form'
import { Form, FormField } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
export interface LayoutOptions {
  labelAlign: 'start' | 'end'
  labelWidth: string
  labelGap: string
  labelWrap: boolean
}
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
@Component({
  selector: 'section[searchLayout]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, Input, Button],
  host: { class: 'grid min-w-0 gap-3 rounded-lg border border-border p-4' },
  template: `
    <h4 class="text-sm font-semibold">{{ titles[layout()] }}</h4>
    <form
      uiForm
      [form]="form"
      [layout]="layout()"
      [labelAlign]="options().labelAlign"
      [labelWidth]="options().labelWidth"
      [labelGap]="options().labelGap"
      [labelWrap]="options().labelWrap"
    >
      <ng-template #nameLabel>姓名</ng-template>
      <div
        formField
        [tanstackField]="form"
        name="name"
        [validators]="validators"
        [label]="nameLabel"
        required
        #name="field"
      >
        <div
          input
          [value]="name.api.state.value"
          (onChange)="name.api.handleChange($any($event).target.value)"
          (focusout)="name.api.handleBlur()"
          placeholder="请输入姓名"
        ></div>
      </div>
      <ng-template #projectLabel>项目名称</ng-template>
      <div
        formField
        [tanstackField]="form"
        name="project"
        [validators]="validators"
        [label]="projectLabel"
        required
        #project="field"
      >
        <div
          input
          [value]="project.api.state.value"
          (onChange)="project.api.handleChange($any($event).target.value)"
          (focusout)="project.api.handleBlur()"
          placeholder="请输入项目名称"
        ></div>
      </div>
      <ng-template #approvalLabel>项目审批负责人联系方式</ng-template
      ><ng-template #approvalDescription
        >用于观察长标签换行后，说明和错误是否仍与控件对齐。</ng-template
      >
      <div
        formField
        [tanstackField]="form"
        name="approval"
        [validators]="validators"
        [label]="approvalLabel"
        required
        [description]="approvalDescription"
        #approval="field"
      >
        <div
          input
          [value]="approval.api.state.value"
          (onChange)="approval.api.handleChange($any($event).target.value)"
          (focusout)="approval.api.handleBlur()"
          placeholder="请输入项目审批负责人联系方式"
        ></div>
      </div>
      <div data-slot="form-actions" class="flex gap-2">
        <button button type="submit" variant="solid" color="primary">查询</button
        ><button button type="reset" (click)="result.set('')">重置</button>
      </div>
    </form>
    @if (result()) {
      <p role="status" class="break-all text-sm text-muted-foreground">查询条件：{{ result() }}</p>
    }
  `,
})
export class SearchLayout {
  readonly layout = input.required<'vertical' | 'horizontal' | 'inline'>()
  readonly options = input.required<LayoutOptions>()
  readonly titles = { vertical: '纵向布局', horizontal: '横向布局', inline: '行内布局' }
  readonly result = signal('')
  readonly validators = { onBlur: requiredText, onSubmit: requiredText }
  readonly form = injectForm({
    defaultValues: { name: '', project: '', approval: '' },
    onSubmit: ({ value }) => {
      this.result.set(JSON.stringify(value))
    },
  })
}
