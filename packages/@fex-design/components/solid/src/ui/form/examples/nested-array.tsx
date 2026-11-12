import { createSignal, For } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import { Form, FormField, FormSubscribe } from '@fex-design/solid/ui/form'
import { Input } from '@fex-design/solid/ui/input'
import { Button } from '@fex-design/solid/ui/button'
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
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
    defaultValues: initialValues,
    onSubmit: ({ value }) =>
      setResult('已保存 ' + value.team.name + '，成员 ' + value.members.length + ' 人'),
  }))
  function addMember() {
    form.pushFieldValue('members', { id: crypto.randomUUID(), name: '', email: '' })
  }
  return (
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">团队与动态成员</h3>
        <p class="text-sm text-muted-foreground">
          team.name 使用嵌套对象路径；成员使用数组路径。新增和删除直接调用 TanStack
          API，每个成员用自己的 id 保持身份。
        </p>
      </header>
      <Form form={form}>
        <FormField name="team.name" validators={nameValidators} label="团队名称" required>
          {(field) => (
            <Input
              value={field().state.value}
              onChange={(event) => field().handleChange(event.currentTarget.value)}
              onBlur={() => field().handleBlur()}
            />
          )}
        </FormField>
        <FormSubscribe selector={(state) => state.values.members}>
          {(members) => (
            <div class="grid gap-4">
              <For each={members().map((member) => member.id)}>
                {(memberId, index) => (
                  <section
                    data-member-id={memberId}
                    class="grid gap-3 rounded-md border border-border p-4"
                    aria-label={`成员 ${index() + 1}`}
                  >
                    <div class="flex items-center justify-between gap-3">
                      <h4 class="font-medium">成员 {index() + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => {
                          void form.removeFieldValue('members', index())
                        }}
                        aria-label={`删除成员 ${index() + 1}`}
                      >
                        删除
                      </Button>
                    </div>
                    <FormField
                      name={`members[${index()}].name`}
                      validators={nameValidators}
                      label="成员姓名"
                      required
                    >
                      {(field) => (
                        <Input
                          value={field().state.value}
                          onChange={(event) => field().handleChange(event.currentTarget.value)}
                          onBlur={() => field().handleBlur()}
                        />
                      )}
                    </FormField>
                    <FormField
                      name={`members[${index()}].email`}
                      validators={emailValidators}
                      label="成员邮箱"
                      required
                    >
                      {(field) => (
                        <Input
                          value={field().state.value}
                          onChange={(event) => field().handleChange(event.currentTarget.value)}
                          onBlur={() => field().handleBlur()}
                        />
                      )}
                    </FormField>
                  </section>
                )}
              </For>
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
            <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values(), null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </Form>
      <p role="status" class="text-sm text-muted-foreground">
        {result()}
      </p>
    </section>
  )
}
