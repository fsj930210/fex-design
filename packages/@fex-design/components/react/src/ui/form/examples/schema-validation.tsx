import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Form, FormField } from '@fex-design/react/ui/form'
import { Input } from '@fex-design/react/ui/input'
import { Button } from '@fex-design/react/ui/button'

const registrationSchema = z
  .object({
    email: z.email('请输入有效邮箱'),
    password: z.string().min(8, '密码至少需要 8 个字符'),
    confirmation: z.string().min(1, '请再次输入密码'),
  })
  .refine((value) => value.password === value.confirmation, {
    path: ['confirmation'],
    message: '两次输入的密码不一致',
  })

export function SchemaValidationExample() {
  const [result, setResult] = useState('')
  const form = useForm({
    defaultValues: { email: '', password: '', confirmation: '' },
    validators: { onChange: registrationSchema, onSubmit: registrationSchema },
    onSubmit: ({ value }) => setResult('注册校验通过：' + value.email),
  })
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">使用 Zod 校验注册信息</h3>
        <p className="text-sm text-muted-foreground">
          对象 Schema 同时校验字段格式和两次密码一致性；确认密码错误归属到对应字段。
        </p>
      </header>
      <Form form={form}>
        <FormField name="email" label="邮箱" required>
          {(field) => (
            <Input
              type="email"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        <FormField name="password" label="密码" required>
          {(field) => (
            <Input
              type="password"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        <FormField name="confirmation" label="确认密码" required>
          {(field) => (
            <Input
              type="password"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.currentTarget.value)}
              onBlur={() => field.handleBlur()}
            />
          )}
        </FormField>
        <Button type="submit" variant="solid" color="primary">
          注册
        </Button>
      </Form>
      {result && (
        <p role="status" className="rounded-md bg-muted-background p-3 text-sm">
          {result}
        </p>
      )}
    </section>
  )
}
