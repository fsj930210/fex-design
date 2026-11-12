import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { injectForm } from '@tanstack/angular-form'
import { Form, FormField } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
const partClasses = {
  root: 'rounded-xl border border-dashed p-4',
  field: 'rounded-lg border p-3',
  label: 'font-semibold',
  description: 'text-xs',
  error: 'rounded-md px-2 py-1 font-medium',
}
const partStyles = {
  root: 'border-color:#64748b',
  field: 'border-color:#a5b4fc',
  label: 'color:#4338ca',
  description: 'color:#475569',
  error: 'color:#b91c1c;background-color:#fee2e2',
}
const titleRule = ({ value }: { value: unknown }) =>
  String(value).trim().length >= 5 ? undefined : '标题至少需要 5 个字符'
@Component({
  selector: 'section[formSemanticStylesExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, Input, Button],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">定制表单语义部件</h3>
        <p class="text-sm text-muted-foreground">
          切换默认与定制样式，分别调整根容器、字段、标签、说明和错误。UI 使用
          classNames/styles，Primitive 直接定制对应部件。
        </p>
      </header>
      <button button type="button" (click)="toggleStyles()">
        {{ customized() ? '恢复默认样式' : '应用语义样式' }}
      </button>
      <form
        uiForm
        [form]="form"
        [classNames]="customized() ? partClasses : {}"
        [styles]="customized() ? partStyles : {}"
      >
        <ng-template #titleLabel>申请标题</ng-template
        ><ng-template #titleDescription
          >至少填写 5 个字符，提交后观察错误部件的独立样式。</ng-template
        >
        <div
          formField
          [tanstackField]="form"
          name="title"
          [label]="titleLabel"
          [description]="titleDescription"
          required
          [validators]="validators"
          [classNames]="customized() ? partClasses : {}"
          [styles]="customized() ? partStyles : {}"
          #title="field"
        >
          <div
            input
            [value]="title.api.state.value"
            (onChange)="title.api.handleChange($any($event).target.value)"
            (focusout)="title.api.handleBlur()"
          ></div>
        </div>
        <button button type="submit" variant="solid" color="primary">提交申请</button>
      </form>
      <p role="status" class="text-sm text-muted-foreground">{{ result() }}</p>
    </section>
  `,
})
export class SemanticStylesExample {
  readonly partClasses = partClasses
  readonly partStyles = partStyles
  readonly customized = signal(true)
  readonly result = signal('')
  readonly validators = { onChange: titleRule }
  readonly form = injectForm({
    defaultValues: { title: '' },
    onSubmit: ({ value }) => {
      this.result.set('已提交：' + value.title)
    },
  })
  toggleStyles() {
    this.customized.update((value) => !value)
  }
}
