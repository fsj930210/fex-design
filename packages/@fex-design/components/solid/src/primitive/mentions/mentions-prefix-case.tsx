import { Show, type ParentProps } from 'solid-js'
import { useMentions } from './use-mentions'

export interface MentionsPrefixCaseProps {
  prefix: string
}

export function MentionsPrefixCase(props: ParentProps<MentionsPrefixCaseProps>) {
  const mentions = useMentions()
  return <Show when={mentions.prefix() === props.prefix}>{props.children}</Show>
}
