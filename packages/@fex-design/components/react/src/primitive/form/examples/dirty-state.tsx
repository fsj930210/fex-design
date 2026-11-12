import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import {
  FormRoot,
  FormField,
  FormControl,
  FormLabel,
  FormError,
  FormSubscribe,
} from '@fex-design/react/primitive/form'
import { InputRoot, InputControl } from '@fex-design/react/primitive/input'
import { Button } from '@fex-design/react/primitive/button'

const initialProfile = { name: '林晓', email: 'lin@example.com' }
const loadedProfile = { name: '陈晨', email: 'chen@example.com' }

export function DirtyStateExample() {
  const [action, setAction] = useState('当前为初始化资料')
  const form = useForm({ defaultValues: initialProfile })
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">编辑状态与初始值比较</h3>
        <p className="text-sm text-muted-foreground">
          isDirty 记录是否编辑过；isDefaultValue
          比较当前值与初始值。改回初始值不会清除编辑记录，重置状态会清除。
        </p>
      </header>
      <FormRoot form={form}>
        <FormField name="name">
          {(field) => (
            <>
              <FormLabel>姓名</FormLabel>
              <FormControl>
                <InputRoot
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                >
                  <InputControl onBlur={() => field.handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <FormField name="email">
          {(field) => (
            <>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <InputRoot
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                >
                  <InputControl onBlur={() => field.handleBlur()} />
                </InputRoot>
              </FormControl>
              <FormError />
            </>
          )}
        </FormField>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => {
              form.setFieldValue('name', loadedProfile.name)
              form.setFieldValue('email', loadedProfile.email)
              setAction('已填入修改值，观察 isDirty 与 isDefaultValue')
            }}
          >
            填入修改值
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.setFieldValue('name', initialProfile.name)
              form.setFieldValue('email', initialProfile.email)
              setAction('已改回初始值，编辑记录仍保留')
            }}
          >
            改回初始值
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.reset()
              setAction('已重置值与编辑状态')
            }}
          >
            重置状态
          </Button>
        </div>
        <FormSubscribe
          selector={(state) => ({
            values: state.values,
            isDirty: state.isDirty,
            isDefaultValue: state.isDefaultValue,
            isTouched: state.isTouched,
          })}
        >
          {(values) => (
            <pre className="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values, null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </FormRoot>
      <p role="status" className="text-sm text-muted-foreground">
        {action}
      </p>
    </section>
  )
}
