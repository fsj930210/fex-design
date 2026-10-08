import { mentionsContentClassName } from '@fex-design/components-styles/mentions'
import { cn } from '@fex-design/utils'
import { Show, splitProps, type JSX, type ParentProps } from 'solid-js'
import { useMentionsContext } from './mentions-context'

export function MentionsContent(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const context = useMentionsContext('MentionsContent')
  const [local, rest] = splitProps(props, ['children', 'class'])
  return (
    <Show when={context.snapshot().open && context.snapshot().query}>
      <div
        {...rest}
        data-slot="mentions-content"
        class={cn(mentionsContentClassName, 'absolute left-0 top-full mt-1 min-w-64', local.class)}
      >
        {local.children}
      </div>
    </Show>
  )
}
