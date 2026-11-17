import { Dialog } from '@fex-design/react/ui/dialog'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Input } from '@fex-design/react/ui/input'
import { Select } from '@fex-design/react/ui/select'
import { Checkbox } from '@fex-design/react/ui/checkbox'
import { Form, FormField } from '@fex-design/react/ui/form'
import { Button } from '@fex-design/react/ui/button'
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
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="编辑团队成员"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button variant="solid" color="primary" onClick={() => void form.handleSubmit()}>
              保存资料
            </Button>
          </>
        }
      >
        <Form form={form} className="w-full">
          <FormField
            name="name"
            label="姓名"
            required
            validators={{ onChange: requiredText, onBlur: requiredText, onSubmit: requiredText }}
          >
            {(field) => (
              <Input
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="请输入联系人姓名"
              />
            )}
          </FormField>
          <FormField
            name="email"
            label="工作邮箱"
            required
            validators={{ onChange: emailRule, onBlur: emailRule, onSubmit: emailRule }}
          >
            {(field) => (
              <Input
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="name@company.com"
              />
            )}
          </FormField>
          <FormField
            name="department"
            label="所属部门"
            required
            validators={{ onChange: requiredText, onBlur: requiredText, onSubmit: requiredText }}
            description="用于分配项目通知和审批权限"
          >
            {(field) => (
              <Select
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                options={departments}
                clearable
              />
            )}
          </FormField>
          <FormField
            name="notifications"
            validators={{ onChange: agreementRule, onSubmit: agreementRule }}
          >
            {(field) => (
              <Checkbox
                checked={field.state.value}
                onChange={(event) => field.handleChange(event.target.checked)}
              >
                接收项目进度邮件
              </Checkbox>
            )}
          </FormField>
        </Form>
      </Dialog>
    </>
  )
}
