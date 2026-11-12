import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
        formRoot
        [form]="form"
        [class]="customized() ? partClasses.root : ''"
        [style]="customized() ? partStyles.root : ''"
      >
        <div
          formField
          [tanstackField]="form"
          name="title"
          [validators]="validators"
          [class]="customized() ? partClasses.field : ''"
          [style]="customized() ? partStyles.field : ''"
          #title="field"
        >
          <label
            formLabel
            required
            [class]="customized() ? partClasses.label : ''"
            [style]="customized() ? partStyles.label : ''"
            >申请标题</label
          ><ng-container formControl
            ><div inputRoot [value]="title.api.state.value">
              <input
                inputControl
                (input)="title.api.handleChange($any($event).target.value)"
                (blur)="title.api.handleBlur()"
              /></div
          ></ng-container>
          <p
            formDescription
            [class]="customized() ? partClasses.description : ''"
            [style]="customized() ? partStyles.description : ''"
          >
            至少填写 5 个字符，提交后观察错误部件的独立样式。
          </p>
          <div
            formError
            [class]="customized() ? partClasses.error : ''"
            [style]="customized() ? partStyles.error : ''"
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
