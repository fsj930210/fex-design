import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormError,
  FormSubscribe,
} from '@fex-design/react/primitive/form'
import { InputRoot, InputControl } from '@fex-design/react/primitive/input'
import { Button } from '@fex-design/react/primitive/button'
const initialValues = {
  team: { name: '产品组' },
  members: [{ id: 'member-1', name: '林晓', email: 'lin@example.com' }],
}
const requiredText = ({ value }: { value: unknown }) =>
  String(value ?? '').trim() ? undefined : '请填写姓名或团队名称'
const emailRule = ({ value }: { value: unknown }) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? undefined : '请输入有效邮箱'
const nameValidators = { onChange: requiredText }
const emailValidators = { onChange: emailRule }
export function NestedArrayExample() {
  const [result, setResult] = useState('')
  const form = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) =>
      setResult('已保存 ' + value.team.name + '，成员 ' + value.members.length + ' 人'),
  })
  function addMember() {
    form.pushFieldValue('members', { id: crypto.randomUUID(), name: '', email: '' })
  }
  return (
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">团队与动态成员</h3>
        <p className="text-sm text-muted-foreground">
          team.name 使用嵌套对象路径；成员使用数组路径。新增和删除直接调用 TanStack
          API，每个成员用自己的 id 保持身份。
        </p>
      </header>
      <FormRoot form={form}>
        <FormField name="team.name" validators={nameValidators}>
          {(field) => (
            <>
              <FormLabel required>团队名称</FormLabel>
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
        <FormSubscribe selector={(state) => state.values.members}>
          {(members) => (
            <div className="grid gap-4">
              {members.map((member, index) => (
                <section
                  key={member.id}
                  className="grid gap-3 rounded-md border border-border p-4"
                  aria-label={`成员 ${index + 1}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-medium">成员 {index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => {
                        void form.removeFieldValue('members', index)
                      }}
                      aria-label={`删除成员 ${index + 1}`}
                    >
                      删除
                    </Button>
                  </div>
                  <FormField name={`members[${index}].name`} validators={nameValidators}>
                    {(field) => (
                      <>
                        <FormLabel required>成员姓名</FormLabel>
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
                  <FormField name={`members[${index}].email`} validators={emailValidators}>
                    {(field) => (
                      <>
                        <FormLabel required>成员邮箱</FormLabel>
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
                </section>
              ))}
              <Button type="button" onClick={addMember}>
                新增成员
              </Button>
            </div>
          )}
        </FormSubscribe>
        <Button type="submit" variant="solid" color="primary">
          保存团队
        </Button>
        <FormSubscribe selector={(state) => state.values}>
          {(values) => (
            <pre className="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values, null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </FormRoot>
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </section>
  )
}
