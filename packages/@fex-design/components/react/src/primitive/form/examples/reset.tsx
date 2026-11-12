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

export function ResetExample() {
  const [action, setAction] = useState('当前为初始化资料')
  const form = useForm({ defaultValues: initialProfile })
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">资料回填与重置</h3>
        <p className="text-sm text-muted-foreground">
          回填只修改当前值；重置姓名只恢复姓名，重置全部恢复初始化资料和字段状态。
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
              setAction('已回填陈晨的资料，初始化值仍为林晓')
            }}
          >
            回填资料
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.resetField('name')
              setAction('已重置姓名，邮箱保持当前值')
            }}
          >
            仅重置姓名
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.reset()
              setAction('已恢复全部初始化资料')
            }}
          >
            重置全部
          </Button>
        </div>
        <FormSubscribe selector={(state) => state.values}>
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
