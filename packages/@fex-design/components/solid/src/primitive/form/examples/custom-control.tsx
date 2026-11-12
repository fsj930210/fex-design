import { createSignal } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormError,
  FormSubscribe,
} from '@fex-design/solid/primitive/form'
import { Button } from '@fex-design/solid/primitive/button'
import { PhoneControl, type PhoneValue } from './_phone-control'
const phoneRule = ({ value }: { value: PhoneValue }) =>
  (value.countryCode === '+86' ? /^\d{11}$/ : /^\d{8}$/).test(value.number)
    ? undefined
    : '请输入有效手机号：+86 为 11 位，+852 为 8 位'
export function CustomControlExample() {
  const [result, setResult] = createSignal('')
  const form = createForm(() => ({
    defaultValues: { phone: { countryCode: '+86', number: '' } as PhoneValue },
    onSubmit: ({ value }) =>
      setResult('已保存手机号：' + value.phone.countryCode + ' ' + value.phone.number),
  }))
  return (
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">自定义手机号控件</h3>
        <p class="text-sm text-muted-foreground">
          控件返回包含区号和号码的对象，调用方显式连接
          value、变更和失焦。点击区号切换规则并清空号码，无需 getValueProps 或事件转换配置。
        </p>
      </header>
      <FormRoot form={form}>
        <FormField name="phone" validators={{ onChange: phoneRule }}>
          {(field) => (
            <>
              <FormLabel required>手机号</FormLabel>
              <FormControl>
                <PhoneControl
                  value={field().state.value}
                  onChange={(value) => field().handleChange(value)}
                  onBlur={() => field().handleBlur()}
                />
              </FormControl>
              <FormDescription>点击区号按钮切换；切换后重新填写号码。</FormDescription>
              <FormError />
            </>
          )}
        </FormField>
        <div class="flex flex-wrap gap-3">
          <Button type="submit" variant="solid" color="primary">
            保存手机号
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.reset()
              setResult('')
            }}
          >
            重置控件
          </Button>
        </div>
        <FormSubscribe selector={(state) => state.values}>
          {(values) => (
            <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">
              {JSON.stringify(values(), null, 2)}
            </pre>
          )}
        </FormSubscribe>
      </FormRoot>
      <p role="status" class="text-sm text-muted-foreground">
        {result()}
      </p>
    </section>
  )
}
