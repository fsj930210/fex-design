import { ChangeDetectionStrategy, Component } from '@angular/core'
import { injectForm } from '@tanstack/angular-form'
import { Form, FormField } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { ScrollActions } from './_scroll-actions'
const fields = [
  { name: 'contact', label: '联系人', description: '填写负责本次申请的联系人姓名。' },
  { name: 'email', label: '联系邮箱', description: '用于接收本次申请的处理进度。' },
  { name: 'company', label: '公司名称', description: '填写申请所属公司的完整名称。' },
  { name: 'address', label: '详细地址', description: '填写街道、门牌号及补充地址信息。' },
  { name: 'city', label: '所在城市', description: '填写申请所属城市，便于安排服务。' },
  { name: 'notes', label: '申请备注', description: '这是最后一个字段，用于演示定位指定错误。' },
] as const
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
const validators = { onChange: requiredText }
@Component({
  selector: 'section[formScrollExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, Input, ScrollActions],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">错误定位与滚动容器</h3>
        <p class="text-sm text-muted-foreground">
          提交失败默认滚动并聚焦首个错误。先提交校验，再点击定位备注错误，观察容器滚动和输入焦点。
        </p>
      </header>
      <form uiForm [form]="form">
        <div formScrollActions></div>
        <div
          class="grid h-80 gap-6 overflow-y-auto rounded-md border border-border p-4"
          aria-label="可滚动的申请字段"
        >
          @for (item of fields; track item.name) {
            <section class="grid gap-2 rounded-md bg-muted-background p-4">
              <ng-template #label>{{ item.label }}</ng-template
              ><ng-template #description>{{ item.description }}</ng-template>
              <div
                formField
                [tanstackField]="form"
                [name]="item.name"
                [label]="label"
                [description]="description"
                required
                [validators]="validators"
                #field="field"
              >
                <div
                  input
                  [value]="field.api.state.value"
                  (onChange)="field.api.handleChange($any($event).target.value)"
                  (focusout)="field.api.handleBlur()"
                ></div>
              </div>
            </section>
          }
        </div>
      </form>
    </section>
  `,
})
export class ScrollExample {
  readonly fields = fields
  readonly validators = validators
  readonly form = injectForm({
    defaultValues: { contact: '', email: '', company: '', address: '', city: '', notes: '' },
  })
}
