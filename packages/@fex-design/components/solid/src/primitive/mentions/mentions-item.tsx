import type { MentionsKey } from '@fex-design/core/mentions/types'
import { mentionsItemClassName } from '@fex-design/components-styles/mentions'
import { cn } from '@fex-design/utils'
import { createEffect, createMemo, onCleanup, type JSX, type ParentProps } from 'solid-js'
import { ListboxItem } from '../listbox'
import { useMentionsContext } from './mentions-context'

export interface MentionsItemProps<TData = unknown> extends ParentProps<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'value'>
> {
  itemKey?: MentionsKey | undefined
  value: string
  disabled?: boolean | undefined
  data?: TData | undefined
}

export function MentionsItem<TData = unknown>(props: MentionsItemProps<TData>) {
  const context = useMentionsContext('MentionsItem')
  const key = createMemo(() => props.itemKey ?? props.value)
  createEffect(() => {
    const unregister = context.controller.registerItem({
      key: key(),
      value: props.value,
      disabled: props.disabled === true,
      data: props.data,
    })
    onCleanup(unregister)
  })
  return (
    <ListboxItem
      id={context.listId + '-' + key()}
      value={key()}
      disabled={props.disabled}
      class={cn(mentionsItemClassName, props.class)}
      onPointerMove={() => context.controller.setActiveKey(key(), 'pointer')}
      onPointerDown={(event) => event.preventDefault()}
      onSelect={() => context.controller.selectItem(key())}
    >
      {props.children ?? props.value}
    </ListboxItem>
  )
}
