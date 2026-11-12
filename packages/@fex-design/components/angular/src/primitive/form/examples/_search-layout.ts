import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core'
import { injectForm, TanStackField } from '@tanstack/angular-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormError,
} from '@fex-design/angular/primitive/form'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import { Button } from '@fex-design/angular/primitive/button'
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
  imports: [
    FormRoot,
    FormField,
    FormLabel,
    FormControl,
    FormDescription,
    FormError,
    InputRoot,
    InputControl,
    TanStackField,
    Button,
  ],
  host: { class: 'grid min-w-0 gap-3 rounded-lg border border-border p-4' },
  template: `
    <h4 class="text-sm font-semibold">{{ titles[layout()] }}</h4>
    <form
      formRoot
      [form]="form"
      [layout]="layout()"
      [labelAlign]="options().labelAlign"
      [labelWidth]="options().labelWidth"
      [labelGap]="options().labelGap"
      [labelWrap]="options().labelWrap"
    >
      <div formField [tanstackField]="form" name="name" [validators]="validators" #name="field">
        <label formLabel required>姓名</label>
        <ng-container formControl
          ><div inputRoot [value]="name.api.state.value">
            <input
              inputControl
              (input)="name.api.handleChange($any($event).target.value)"
              (blur)="name.api.handleBlur()"
              placeholder="请输入姓名"
            /></div
        ></ng-container>
        <div formError></div>
      </div>
      <div
        formField
        [tanstackField]="form"
        name="project"
        [validators]="validators"
        #project="field"
      >
        <label formLabel required>项目名称</label>
        <ng-container formControl
          ><div inputRoot [value]="project.api.state.value">
            <input
              inputControl
              (input)="project.api.handleChange($any($event).target.value)"
              (blur)="project.api.handleBlur()"
              placeholder="请输入项目名称"
            /></div
        ></ng-container>
        <div formError></div>
      </div>
      <div
        formField
        [tanstackField]="form"
        name="approval"
        [validators]="validators"
        #approval="field"
      >
        <label formLabel required>项目审批负责人联系方式</label>
        <ng-container formControl
          ><div inputRoot [value]="approval.api.state.value">
            <input
              inputControl
              (input)="approval.api.handleChange($any($event).target.value)"
              (blur)="approval.api.handleBlur()"
              placeholder="请输入项目审批负责人联系方式"
            /></div
        ></ng-container>
        <p formDescription>用于观察长标签换行后，说明和错误是否仍与控件对齐。</p>
        <div formError></div>
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
