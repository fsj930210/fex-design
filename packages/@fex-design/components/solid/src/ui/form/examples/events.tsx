import { createSignal } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import { Form, FormField, FormSubscribe } from '@fex-design/solid/ui/form'
import { Input } from '@fex-design/solid/ui/input'
import { RadioGroup } from '@fex-design/solid/ui/radio'
import { Button } from '@fex-design/solid/ui/button'
const channels = [
  { value: 'email', label: '邮件' },
  { value: 'sms', label: '短信' },
]
export function EventsExample() {
  const [log, setLog] = createSignal('请选择通知渠道，然后填写收件地址')
  const form = createForm(() => ({ defaultValues: { channel: 'email', address: '' } }))
  function changeChannel(value: string) {
    form.setFieldValue('channel', value)
    form.setFieldValue('address', '')
    setLog('已切换到' + (value === 'email' ? '邮件' : '短信') + '并清空收件地址')
  }
  function fillAddress() {
    const value = form.state.values.channel === 'email' ? 'member@example.com' : '13800138000'
    form.setFieldValue('address', value)
    setLog('已回填：' + value)
  }
  return (
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">通知渠道与收件地址</h3>
        <p class="text-sm text-muted-foreground">
          切换渠道时在事件回调中清空地址；回填按钮根据当前渠道设置示例地址，失焦时记录当前输入。
        </p>
      </header>
      <Form form={form}>
        <FormField name="channel" label="通知渠道">
          {(field) => (
            <RadioGroup
              value={field().state.value}
              onChange={(value) => changeChannel(String(value))}
              orientation="horizontal"
              options={channels}
            />
          )}
        </FormField>
        <FormSubscribe selector={(state) => state.values.channel}>
          {(channel) => (
            <div class="grid gap-3">
              <FormField name="address" label="收件地址">
                {(field) => (
                  <Input
                    value={field().state.value}
                    onChange={(event) => field().handleChange(event.currentTarget.value)}
                    onBlur={() => {
                      field().handleBlur()
                      setLog('收件地址已失焦：' + (field().state.value || '空'))
                    }}
                    placeholder={channel() === 'email' ? '请输入邮箱地址' : '请输入手机号码'}
                  />
                )}
              </FormField>
              <Button type="button" onClick={fillAddress}>
                回填当前渠道地址
              </Button>
            </div>
          )}
        </FormSubscribe>
        <FormSubscribe selector={(state) => state.values}>
          {(values) => (
            <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values(), null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </Form>
      <p role="status" class="text-sm text-muted-foreground">
        {log()}
      </p>
    </section>
  )
}
