import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormSubscribe,
} from '@fex-design/react/primitive/form'
import { InputRoot, InputControl } from '@fex-design/react/primitive/input'
import { RadioGroup, Radio } from '@fex-design/react/primitive/radio'
import { Button } from '@fex-design/react/primitive/button'
const channels = [
  { value: 'email', label: '邮件' },
  { value: 'sms', label: '短信' },
]
export function EventsExample() {
  const [log, setLog] = useState('请选择通知渠道，然后填写收件地址')
  const form = useForm({ defaultValues: { channel: 'email', address: '' } })
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
    <section className="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header className="grid gap-1">
        <h3 className="text-base font-semibold">通知渠道与收件地址</h3>
        <p className="text-sm text-muted-foreground">
          切换渠道时在事件回调中清空地址；回填按钮根据当前渠道设置示例地址，失焦时记录当前输入。
        </p>
      </header>
      <FormRoot form={form}>
        <FormField name="channel">
          {(field) => (
            <>
              <FormLabel>通知渠道</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.state.value}
                  onChange={(value) => changeChannel(String(value))}
                  orientation="horizontal"
                >
                  {channels.map((option) => (
                    <label key={option.value} className="inline-flex items-center gap-2">
                      <Radio value={option.value} />
                      {option.label}
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
            </>
          )}
        </FormField>
        <FormSubscribe selector={(state) => state.values.channel}>
          {(channel) => (
            <div className="grid gap-3">
              <FormField name="address">
                {(field) => (
                  <>
                    <FormLabel>收件地址</FormLabel>
                    <FormControl>
                      <InputRoot
                        value={field.state.value}
                        onChange={(value) => field.handleChange(value)}
                      >
                        <InputControl
                          onBlur={() => {
                            field.handleBlur()
                            setLog('收件地址已失焦：' + (field.state.value || '空'))
                          }}
                          placeholder={channel === 'email' ? '请输入邮箱地址' : '请输入手机号码'}
                        />
                      </InputRoot>
                    </FormControl>
                  </>
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
            <pre className="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values, null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </FormRoot>
      <p role="status" className="text-sm text-muted-foreground">
        {log}
      </p>
    </section>
  )
}
