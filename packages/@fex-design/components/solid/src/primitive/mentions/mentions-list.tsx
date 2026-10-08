import { mentionsListClassName } from '@fex-design/components-styles/mentions'
import { cn } from '@fex-design/utils'
import { type JSX, type ParentProps } from 'solid-js'
import { ListboxRoot } from '../listbox'
import { useMentionsContext } from './mentions-context'

export function MentionsList(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const context = useMentionsContext('MentionsList')
  return (
    <ListboxRoot
      {...props}
      id={context.listId}
      value={context.snapshot().activeKey}
      onChange={(value) => context.controller.setActiveKey(Array.isArray(value) ? value[0] : value)}
      class={cn(mentionsListClassName, props.class)}
    >
      {props.children}
    </ListboxRoot>
  )
}
