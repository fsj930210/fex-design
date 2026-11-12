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
import {
  MentionsRoot,
  MentionsTrigger,
  MentionsContent,
  MentionsList,
  MentionsItem,
  useMentions,
} from '@fex-design/react/primitive/mentions'
import { Button } from '@fex-design/react/ui/button'
import { Card } from '@fex-design/react/ui/card'
import { filterByText, mentionUsers } from './data'

function UserItems() {
  const mentions = useMentions()
  return (
    <MentionsList>
      {filterByText(mentionUsers, mentions.text, (user) => user.name).map((user) => (
        <MentionsItem key={user.id} itemKey={user.id} value={user.name} data={user}>
          {user.name}
        </MentionsItem>
      ))}
    </MentionsList>
  )
}
type PromptControlProps = Omit<ComponentProps<typeof MentionsTrigger>, 'onChange'> & {
  value?: string
  onChange?: (value: string) => void
}
function PromptControl({ value, onChange, ...props }: PromptControlProps) {
  return (
    <MentionsRoot value={value} onChange={(next) => onChange?.(next)}>
      <MentionsTrigger {...props} placeholder="提交空内容以显示校验反馈" />
      <MentionsContent>
        <UserItems />
      </MentionsContent>
    </MentionsRoot>
  )
}
export function ValidationDemo() {
  const form = useForm({ defaultValues: { prompt: '' }, onSubmit: () => undefined })
  return (
    <Card title="Form validation" description="组合提及控件与字段反馈。">
      <FormRoot form={form}>
        <FormField
          name="prompt"
          validators={{
            onSubmit: ({ value }) => (String(value).trim() ? undefined : '请输入提示内容'),
          }}
        >
          <FormItem>
            <FormLabel required>提示内容</FormLabel>
            <FormControl>
              <PromptControl />
            </FormControl>
            <FormError />
          </FormItem>
        </FormField>
        <Button type="submit">提交校验</Button>
      </FormRoot>
    </Card>
  )
}
