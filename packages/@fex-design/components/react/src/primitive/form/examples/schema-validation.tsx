import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import {
  FormRoot,
  FormField,
  FormControl,
  FormLabel,
  FormError,
} from '@fex-design/react/primitive/form'
import { InputRoot, InputControl } from '@fex-design/react/primitive/input'
import { Button } from '@fex-design/react/primitive/button'

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
      <FormRoot form={form}>
        <FormField name="email">
          {(field) => (
            <>
              <FormLabel required>邮箱</FormLabel>
              <FormControl>
                <InputRoot
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                >
                  <InputControl type="email" onBlur={() => field.handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="password">
          {(field) => (
            <>
              <FormLabel required>密码</FormLabel>
              <FormControl>
                <InputRoot
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                >
                  <InputControl type="password" onBlur={() => field.handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="confirmation">
          {(field) => (
            <>
              <FormLabel required>确认密码</FormLabel>
              <FormControl>
                <InputRoot
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                >
                  <InputControl type="password" onBlur={() => field.handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <Button type="submit" variant="solid" color="primary">
          注册
        </Button>
      </FormRoot>
      {result && (
        <p role="status" className="rounded-md bg-muted-background p-3 text-sm">
          {result}
        </p>
      )}
    </section>
  )
}
