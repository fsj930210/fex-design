import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
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
const presets = {
  compact: {
    '--form-gap': '12px',
    '--form-item-gap': '4px',
    '--form-label-color': '#0f766e',
    '--form-description-color': '#475569',
    '--form-error-color': '#b91c1c',
  },
  spacious: {
    '--form-gap': '24px',
    '--form-item-gap': '10px',
    '--form-label-color': '#4338ca',
    '--form-description-color': '#6d28d9',
    '--form-error-color': '#be123c',
  },
}
const requiredText = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请填写此项'
@Component({
  selector: 'section[formCssVariablesExample]',
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
    JsonPipe,
  ],
  host: { class: 'contents' },
  template: `
    <section
      class="mx-auto grid w-full max-w-xl gap-5 p-5"
      [style]="presets[spacious() ? 'spacious' : 'compact']"
    >
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">通过 CSS 变量定制表单</h3>
        <p class="text-sm text-muted-foreground">
          切换两组局部变量，观察字段间距、内部间距及标签、说明、错误颜色。变量由业务容器继承到
          Form，不修改控件的数据绑定。
        </p>
      </header>
      <div class="flex items-center gap-3">
        <button button type="button" (click)="togglePreset()">
          切换为{{ spacious() ? '紧凑' : '宽松' }}变量</button
        ><span>当前配置：{{ spacious() ? '宽松' : '紧凑' }}</span>
      </div>
      <form formRoot [form]="form">
        <div
          formField
          [tanstackField]="form"
          name="project"
          [validators]="validators"
          #project="field"
        >
          <label formLabel required>项目名称</label
          ><ng-container formControl
            ><div inputRoot [value]="project.api.state.value">
              <input
                inputControl
                (input)="project.api.handleChange($any($event).target.value)"
                (blur)="project.api.handleBlur()"
              /></div
          ></ng-container>
          <p formDescription>字段之间的距离由 --form-gap 控制。</p>
          <div formError></div>
        </div>
        <div formField [tanstackField]="form" name="owner" [validators]="validators" #owner="field">
          <label formLabel required>负责人</label
          ><ng-container formControl
            ><div inputRoot [value]="owner.api.state.value">
              <input
                inputControl
                (input)="owner.api.handleChange($any($event).target.value)"
                (blur)="owner.api.handleBlur()"
              /></div
          ></ng-container>
          <p formDescription>标签、控件与反馈之间由 --form-item-gap 控制。</p>
          <div formError></div>
        </div>
        <button button type="submit" variant="solid" color="primary">保存项目</button>
      </form>
      <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
        presets[spacious() ? 'spacious' : 'compact'] | json
      }}</pre>
      <p role="status" class="text-sm text-muted-foreground">{{ result() }}</p>
    </section>
  `,
})
export class CssVariablesExample {
  readonly presets = presets
  readonly spacious = signal(false)
  readonly result = signal('')
  readonly validators = { onChange: requiredText }
  readonly form = injectForm({
    defaultValues: { project: '', owner: '' },
    onSubmit: ({ value }) => {
      this.result.set('已保存项目：' + value.project)
    },
  })
  togglePreset() {
    this.spacious.update((value) => !value)
  }
}
