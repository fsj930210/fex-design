import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm } from '@tanstack/angular-form'
import { Form, FormField } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
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
  imports: [Form, FormField, Input, Button, JsonPipe],
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
      <form uiForm [form]="form">
        <ng-template #projectLabel>项目名称</ng-template
        ><ng-template #projectDescription>字段之间的距离由 --form-gap 控制。</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="project"
          [label]="projectLabel"
          [description]="projectDescription"
          required
          [validators]="validators"
          #project="field"
        >
          <div
            input
            [value]="project.api.state.value"
            (onChange)="project.api.handleChange($any($event).target.value)"
            (focusout)="project.api.handleBlur()"
          ></div>
        </div>
        <ng-template #ownerLabel>负责人</ng-template
        ><ng-template #ownerDescription>标签、控件与反馈之间由 --form-item-gap 控制。</ng-template>
        <div
          formField
          [tanstackField]="form"
          name="owner"
          [label]="ownerLabel"
          [description]="ownerDescription"
          required
          [validators]="validators"
          #owner="field"
        >
          <div
            input
            [value]="owner.api.state.value"
            (onChange)="owner.api.handleChange($any($event).target.value)"
            (focusout)="owner.api.handleBlur()"
          ></div>
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
