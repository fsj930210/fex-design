import { Dialog } from '@fex-design/angular/ui/dialog'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Input } from '@fex-design/angular/ui/input'
import { Select } from '@fex-design/angular/ui/select'
import { Checkbox } from '@fex-design/angular/ui/checkbox'
import { Button } from '@fex-design/angular/ui/button'
import { Form } from '@fex-design/angular/ui/form'
import { injectForm, type AnyFormState, TanStackField } from '@tanstack/angular-form'

const departments = [
  { value: 'product', label: '产品与设计' },
  { value: 'engineering', label: '研发团队' },
  { value: 'operations', label: '客户运营' },
]
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'

@Component({
  selector: 'dialog-form-ui-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Dialog, Form, TanStackField, Button, Input, Select, Checkbox],
  templateUrl: './form.html',
})
export class DialogFormExample {
  readonly open = signal(false)
  onOpenChange(event: unknown) {
    this.open.set(Array.isArray(event) ? Boolean(event[0]) : Boolean(event))
  }
  readonly result = signal('')
  readonly form = injectForm({
    defaultValues: { name: '', email: '', department: 'product', notifications: true },
    onSubmit: async ({ value }: { value: { name: string; email: string } }) => {
      this.result.set(`已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`)
      this.open.set(false)
    },
  })
  readonly departments = departments
  readonly checkedValue = (event: unknown) => ((event as Event).target as HTMLInputElement).checked
  readonly selectValue = (event: unknown) => (event as { value: string }).value
  readonly selector = (state: AnyFormState) => state.isSubmitting
  readonly validators0 = { onChange: requiredText, onBlur: requiredText, onSubmit: requiredText }
  readonly validators1 = { onChange: emailRule, onBlur: emailRule, onSubmit: emailRule }
  readonly validators2 = { onChange: requiredText, onBlur: requiredText, onSubmit: requiredText }
  readonly validators3 = {
    onChange: ({ value }: { value: unknown }) => (value === true ? undefined : '请勾选此项'),
    onBlur: ({ value }: { value: unknown }) => (value === true ? undefined : '请勾选此项'),
    onSubmit: ({ value }: { value: unknown }) => (value === true ? undefined : '请勾选此项'),
  }
}
