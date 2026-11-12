import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Form, FormSubscribe } from '@fex-design/react/ui/form'
import { Button } from '@fex-design/react/ui/button'
import { AddressFields } from './_address-fields'
export function FieldPrefixExample() {
  const [result, setResult] = useState('')
  const form = useForm({
    defaultValues: {
      shipping: { city: '上海', street: '' },
      billing: { city: '杭州', street: '' },
    },
    onSubmit: () => setResult('已保存寄送地址和账单地址'),
  })
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">复用带路径前缀的地址字段组</h3>
        <p className="text-sm text-muted-foreground">
          同一个地址组件分别接收 shipping 和 billing 前缀，显式组成字段路径。两组共用一个 TanStack
          实例，值和校验分别归属各自路径。
        </p>
      </header>
      <Form form={form}>
        <AddressFields prefix="shipping" legend="寄送地址" />
        <AddressFields prefix="billing" legend="账单地址" />
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => form.setFieldValue('billing', { ...form.state.values.shipping })}
          >
            复制寄送地址到账单
          </Button>
          <Button type="submit" variant="solid" color="primary">
            保存两组地址
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.reset()
              setResult('')
            }}
          >
            重置两组地址
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
