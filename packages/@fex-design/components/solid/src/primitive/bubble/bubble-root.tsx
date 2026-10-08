import {
  resolveConversationSide,
  type BubbleSize,
  type BubbleVariant,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { bubbleClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import {
  createMemo,
  splitProps,
  useContext,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { BubbleContext, MessageSideContext } from './bubble-context'

export interface BubbleProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  side?: ConversationSide
  variant?: BubbleVariant
  size?: BubbleSize
}

export function Bubble(props: BubbleProps) {
  const [local, rest] = splitProps(props, ['side', 'variant', 'size', 'class', 'children'])
  const inherited = useContext(MessageSideContext)
  const side = createMemo(() => resolveConversationSide(local.side, inherited?.()))
  const context = { side, size: () => local.size ?? 'md', variant: () => local.variant ?? 'soft' }
  return (
    <BubbleContext.Provider value={context}>
      <div
        {...rest}
        data-slot="bubble"
        data-side={side()}
        data-variant={context.variant()}
        data-size={context.size()}
        class={cn(bubbleClassName({ size: context.size() }), local.class)}
      >
        {local.children}
      </div>
    </BubbleContext.Provider>
  )
}

export { Bubble as BubbleRoot, type BubbleProps as BubbleRootProps }
