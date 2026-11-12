import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Form, FormField, FormSubscribe } from '@fex-design/react/ui/form'
import { Input } from '@fex-design/react/ui/input'
import { Button } from '@fex-design/react/ui/button'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
export function SubmitExample() {
  const [receipt, setReceipt] = useState('尚未提交申请')
  const form = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value, formApi }) => {
      setReceipt('正在发送申请，请等待…')
      await new Promise<void>((resolve) => setTimeout(resolve, 900))
      if (value.email === 'used@example.com') {
        formApi.setFieldMeta('email', (meta) => ({
          ...meta,
          errorMap: { ...meta.errorMap, onSubmit: '该邮箱已有申请，请更换邮箱' },
        }))
        setReceipt('申请未发送，请处理邮箱错误后重试')
        return
      }
      setReceipt('申请已发送至 ' + value.email)
    },
  })
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">申请产品试用</h3>
        <p className="text-sm text-muted-foreground">
          模拟请求等待 900ms。使用占用邮箱查看业务错误，修改邮箱后重试；提交期间禁止修改和重复发送。
        </p>
      </header>
      <Form form={form}>
        <FormSubscribe
          selector={(state) => ({ busy: state.isSubmitting, attempts: state.submissionAttempts })}
        >
          {(state) => (
            <>
              <FormField
                name="email"
                label="申请邮箱"
                required
                validators={{ onChange: emailRule, onSubmit: emailRule }}
              >
                {(field) => (
                  <Input
                    disabled={state.busy}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.currentTarget.value)}
                    onBlur={() => field.handleBlur()}
                    placeholder="name@company.com"
                  />
                )}
              </FormField>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" color="primary" variant="solid" disabled={state.busy}>
                  {state.busy ? '正在发送…' : '发送申请'}
                </Button>
                <Button
                  type="button"
                  disabled={state.busy}
                  onClick={() => form.setFieldValue('email', 'used@example.com')}
                >
                  使用占用邮箱
                </Button>
              </div>
              <p role="status" className="text-sm text-muted-foreground">
                {state.busy ? '请求处理中，不能重复提交' : '可以提交'}；提交尝试：{state.attempts}{' '}
                次（含校验未通过）
              </p>
            </>
          )}
        </FormSubscribe>
      </Form>
      <p role="status" className="rounded-md bg-muted-background p-3 text-sm">
        {receipt}
      </p>
    </section>
  )
}
