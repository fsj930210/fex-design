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
} from '@fex-design/react/primitive/dialog'
import { InputRoot, InputControl } from '@fex-design/react/primitive/input'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/react/primitive/select'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
} from '@fex-design/react/primitive/checkbox'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import {
  FormRoot,
  FormField,
  FormControl,
  FormLabel,
  FormDescription,
  FormError,
} from '@fex-design/react/primitive/form'
import { Button } from '@fex-design/react/primitive/button'

const departments = [
  { value: 'product', label: '产品与设计' },
  { value: 'engineering', label: '研发团队' },
  { value: 'operations', label: '客户运营' },
]
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写此项'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'

const agreementRule = ({ value }: { value: unknown }) =>
  value === true ? undefined : '请确认接收项目进度邮件'

export function DialogFormExample() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState('')

  const form = useForm({
    defaultValues: { name: '', email: '', department: 'product', notifications: true },

    onSubmit: async ({ value }) => {
      setResult(`已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`)

      setOpen(false)
    },
  })

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开表单弹窗</Button>
      <p role="status">{result || '尚未提交'}</p>
      <DialogRoot open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>编辑团队成员</DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody>
              <FormRoot form={form} className="w-full">
                <FormField
                  name="name"
                  validators={{
                    onChange: requiredText,
                    onBlur: requiredText,
                    onSubmit: requiredText,
                  }}
                >
                  {(field) => (
                    <>
                      <FormLabel required>姓名</FormLabel>
                      <FormControl>
                        <InputRoot>
                          <InputControl
                            value={field.state.value}
                            onChange={(event) => field.handleChange(event.target.value)}
                            placeholder="请输入联系人姓名"
                          />
                        </InputRoot>
                      </FormControl>

                      <FormError />
                    </>
                  )}
                </FormField>
                <FormField
                  name="email"
                  validators={{ onChange: emailRule, onBlur: emailRule, onSubmit: emailRule }}
                >
                  {(field) => (
                    <>
                      <FormLabel required>工作邮箱</FormLabel>
                      <FormControl>
                        <InputRoot>
                          <InputControl
                            value={field.state.value}
                            onChange={(event) => field.handleChange(event.target.value)}
                            placeholder="name@company.com"
                          />
                        </InputRoot>
                      </FormControl>

                      <FormError />
                    </>
                  )}
                </FormField>
                <FormField
                  name="department"
                  validators={{
                    onChange: requiredText,
                    onBlur: requiredText,
                    onSubmit: requiredText,
                  }}
                >
                  {(field) => (
                    <>
                      <FormLabel required>所属部门</FormLabel>
                      <FormControl>
                        <SelectRoot
                          value={field.state.value}
                          onChange={(value) => field.handleChange(value)}
                          options={departments}
                          clearable
                        >
                          <SelectTrigger inputProps={{ 'aria-label': '所属部门' }} />
                          <SelectContent />
                        </SelectRoot>
                      </FormControl>
                      <FormDescription>用于分配项目通知和审批权限。</FormDescription>
                      <FormError />
                    </>
                  )}
                </FormField>
                <FormField
                  name="notifications"
                  validators={{
                    onChange: agreementRule,
                    onBlur: agreementRule,
                    onSubmit: agreementRule,
                  }}
                >
                  {(field) => (
                    <>
                      <CheckboxRoot>
                        <FormControl>
                          <CheckboxControl
                            checked={field.state.value}
                            onChange={(event) => field.handleChange(event.target.checked)}
                          />
                        </FormControl>
                        <CheckboxIndicator />
                        <FormLabel>接收项目进度邮件</FormLabel>
                      </CheckboxRoot>
                      <FormError />
                    </>
                  )}
                </FormField>
              </FormRoot>
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>取消</Button>
              <Button variant="solid" color="primary" onClick={() => void form.handleSubmit()}>
                保存资料
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  )
}
