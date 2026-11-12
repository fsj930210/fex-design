import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Form, FormField, FormSubscribe } from '@fex-design/react/ui/form'
import { Input } from '@fex-design/react/ui/input'
import { Button } from '@fex-design/react/ui/button'
const nameRule = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请输入昵称'
const signatureRule = ({ value }: { value: unknown }) =>
  String(value).trim().length >= 10 ? undefined : '签名至少需要 10 个字符'
export function ContextOnlyExample() {
  const [result, setResult] = useState('')
  const form = useForm({
    defaultValues: { nickname: '小林', signature: '' },
    onSubmit: ({ value }) => setResult('已保存 ' + value.nickname + ' 的个人签名'),
  })
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">个人资料面板：只提供上下文</h3>
        <p className="text-sm text-muted-foreground">
          业务面板组织内容和操作按钮，Form 只提供字段上下文，不输出原生 form。保存按钮直接调用
          TanStack handleSubmit，恢复按钮调用 reset。
        </p>
      </header>
      <Form form={form} component={false}>
        <div className="grid gap-4 rounded-md border border-border p-4" aria-label="个人资料编辑区">
          <FormField
            name="nickname"
            label="昵称"
            description="这项资料只在当前面板中编辑。"
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
            name="signature"
            label="个人签名"
            description="至少 10 个字符，错误消息仍由 FormError 展示。"
            required
            validators={{ onChange: signatureRule }}
          >
            {(field) => (
              <Input
                value={field.state.value}
                onChange={(event) => field.handleChange(event.currentTarget.value)}
                onBlur={() => field.handleBlur()}
              />
            )}
          </FormField>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="solid"
            color="primary"
            onClick={() => {
              void form.handleSubmit()
            }}
          >
            保存签名
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.reset()
              setResult('')
            }}
          >
            恢复初始资料
          </Button>
        </div>
        <FormSubscribe selector={(state) => state.values}>
          {(values) => (
            <pre className="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values, null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </Form>
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </section>
  )
}
