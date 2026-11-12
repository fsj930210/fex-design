import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Form, FormField } from '@fex-design/react/ui/form'
import { Input } from '@fex-design/react/ui/input'
import { Button } from '@fex-design/react/ui/button'
const nameRule = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请输入账号名称'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
export function DirectionExample() {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')
  const [result, setResult] = useState('')
  const form = useForm({
    defaultValues: { account: '', email: '' },
    onSubmit: ({ value }) => setResult('已保存账号：' + value.account),
  })
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">LTR 与 RTL 表单方向</h3>
        <p className="text-sm text-muted-foreground">
          切换原生
          dir，观察横向布局的标签列、说明、错误与操作区如何镜像；切换方向保留当前值和校验状态。
        </p>
      </header>
      <div className="flex items-center gap-3">
        <Button type="button" onClick={() => setDirection(direction === 'ltr' ? 'rtl' : 'ltr')}>
          切换为 {direction === 'ltr' ? 'RTL' : 'LTR'}
        </Button>
        <span>当前方向：{direction.toUpperCase()}</span>
      </div>
      <Form
        form={form}
        dir={direction}
        layout="horizontal"
        labelAlign="end"
        labelWidth="8rem"
        labelWrap
      >
        <FormField
          name="account"
          label="账号名称"
          description="说明和错误始终与控件列对齐。"
          required
          validators={{ onChange: nameRule }}
        >
          {(field) => (
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        <FormField
          name="email"
          label="团队通知联系邮箱"
          description="长标签允许换行，方向切换保留输入内容。"
          required
          validators={{ onChange: emailRule }}
        >
          {(field) => (
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        <div data-slot="form-actions" className="flex flex-wrap gap-3">
          <Button type="submit" variant="solid" color="primary">
            保存账号
          </Button>
        </div>
      </Form>
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </section>
  )
}
