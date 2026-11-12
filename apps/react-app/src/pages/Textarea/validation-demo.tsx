import type { ComponentProps } from 'react'
import {
  FormRoot,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormError,
  useForm,
} from '@fex-design/react/primitive/form'
import { TextareaInput, TextareaRoot } from '@fex-design/react/primitive/textarea'
import { Button } from '@fex-design/react/ui/button'
import { Card } from '@fex-design/react/ui/card'

type MessageControlProps = Omit<ComponentProps<typeof TextareaInput>, 'onChange'> & {
  value?: string
  onChange?: (value: string) => void
}
function MessageControl({ value, onChange, ...props }: MessageControlProps) {
  return (
    <TextareaRoot
      value={value}
      onChange={(next) => onChange?.(next)}
      autoSize={{ minRows: 3, maxRows: 6 }}
    >
      <TextareaInput {...props} placeholder="提交空内容以显示校验反馈" />
    </TextareaRoot>
  )
}
export function ValidationDemo() {
  const form = useForm({ defaultValues: { message: '' }, onSubmit: () => undefined })
  return (
    <Card title="Form validation" description="FormControl 自动连接值、事件和错误语义。">
      <FormRoot form={form}>
        <FormField
          name="message"
          validators={{
            onSubmit: ({ value }) => (String(value).trim() ? undefined : '请输入内容'),
          }}
        >
          <FormItem>
            <FormLabel required>消息</FormLabel>
            <FormControl>
              <MessageControl />
            </FormControl>
            <FormError />
          </FormItem>
        </FormField>
        <Button type="submit">提交校验</Button>
      </FormRoot>
    </Card>
  )
}
