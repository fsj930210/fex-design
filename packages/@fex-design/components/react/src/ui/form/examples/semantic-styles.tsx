import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Form, FormField } from '@fex-design/react/ui/form'
import { Input } from '@fex-design/react/ui/input'
import { Button } from '@fex-design/react/ui/button'
const partClasses = {
  root: 'rounded-xl border border-dashed p-4',
  field: 'rounded-lg border p-3',
  label: 'font-semibold',
  description: 'text-xs',
  error: 'rounded-md px-2 py-1 font-medium',
}
const partStyles = {
  root: { borderColor: '#64748b' },
  field: { borderColor: '#a5b4fc' },
  label: { color: '#4338ca' },
  description: { color: '#475569' },
  error: { color: '#b91c1c', backgroundColor: '#fee2e2' },
}
const titleRule = ({ value }: { value: unknown }) =>
  String(value).trim().length >= 5 ? undefined : '标题至少需要 5 个字符'
export function SemanticStylesExample() {
  const [customized, setCustomized] = useState(true)
  const [result, setResult] = useState('')
  const form = useForm({
    defaultValues: { title: '' },
    onSubmit: ({ value }) => setResult('已提交：' + value.title),
  })
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">定制表单语义部件</h3>
        <p className="text-sm text-muted-foreground">
          切换默认与定制样式，分别调整根容器、字段、标签、说明和错误。UI 使用
          classNames/styles，Primitive 直接定制对应部件。
        </p>
      </header>
      <Button type="button" onClick={() => setCustomized(!customized)}>
        {customized ? '恢复默认样式' : '应用语义样式'}
      </Button>
      <Form
        form={form}
        classNames={customized ? partClasses : undefined}
        styles={customized ? partStyles : undefined}
      >
        <FormField
          name="title"
          label="申请标题"
          description="至少填写 5 个字符，提交后观察错误部件的独立样式。"
          required
          validators={{ onChange: titleRule }}
          classNames={customized ? partClasses : undefined}
          styles={customized ? partStyles : undefined}
        >
          {(field) => (
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        <Button type="submit" variant="solid" color="primary">
          提交申请
        </Button>
      </Form>
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </section>
  )
}
