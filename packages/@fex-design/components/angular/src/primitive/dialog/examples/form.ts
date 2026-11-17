import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogActions,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '@fex-design/angular/primitive/dialog'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
} from '@fex-design/angular/primitive/checkbox'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormRoot } from '@fex-design/angular/primitive/form'
import { injectForm, TanStackField, type AnyFormState } from '@tanstack/angular-form'
import { Button } from '@fex-design/angular/primitive/button'
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectList,
} from '@fex-design/angular/primitive/select'

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
  selector: 'dialog-form-primitive-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogActions,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogClose,
    FormRoot,
    TanStackField,
    Button,
    InputRoot,
    InputControl,
    CheckboxControl,
    CheckboxRoot,
    CheckboxIndicator,
    SelectRoot,
    SelectTrigger,
    SelectContent,
    SelectList,
  ],
  templateUrl: './form.html',
})
export class DialogFormExample {
  readonly open = signal(false)
  onOpenChange(event: unknown) {
    this.open.set(Array.isArray(event) ? Boolean(event[0]) : Boolean(event))
  }
  readonly result = signal<string>('')
  readonly form = injectForm({
    defaultValues: { name: '', email: '', department: 'product', notifications: true },

    onSubmit: async ({
      value,
    }: {
      value: { name: string; email: string; department: string; notifications: boolean }
    }) => {
      this.result.set(`已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`)
      this.open.set(false)
    },
  })
  constructor() {
    console.debug('[angular-form][basic] default form state', this.form.state)
  }
  readonly departments = departments
  readonly departmentChanged = (event: { value: unknown }) => {
    this.form.setFieldValue('department', typeof event.value === 'string' ? event.value : '')
  }
  readonly requiredText = requiredText
  readonly emailRule = emailRule
  readonly selector0 = (state: AnyFormState) => state.isSubmitting
  readonly validators0 = {
    onChange: this.requiredText,
    onBlur: this.requiredText,
    onSubmit: this.requiredText,
  }
  readonly validators1 = {
    onChange: this.emailRule,
    onBlur: this.emailRule,
    onSubmit: this.emailRule,
  }
  readonly validators2 = {
    onChange: this.requiredText,
    onBlur: this.requiredText,
    onSubmit: this.requiredText,
  }
  readonly validators3 = {
    onChange: ({ value }: { value: unknown }) => (value === true ? undefined : '请勾选此项'),
    onBlur: ({ value }: { value: unknown }) => (value === true ? undefined : '请勾选此项'),
    onSubmit: ({ value }: { value: unknown }) => (value === true ? undefined : '请勾选此项'),
  }
}
