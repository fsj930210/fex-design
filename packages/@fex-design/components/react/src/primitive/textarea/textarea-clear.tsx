import { textareaClearClassName } from '@fex-design/components-styles/textarea'
import { cn } from '@fex-design/utils'
import type { ComponentProps, MouseEvent, PointerEvent, ReactNode, Ref } from 'react'
import { XIcon } from '@fex-design/react/icons/x'
import { Button } from '../button/button'
import {
  useTextareaContext,
  type TextareaClearRenderProps,
} from './textarea-context'

export interface TextareaClearProps extends Omit<ComponentProps<'button'>, 'type' | 'children'> {
  forceMount?: boolean | undefined
  ref?: Ref<HTMLButtonElement> | undefined
  children?: ReactNode | ((props: TextareaClearRenderProps) => ReactNode)
}

export function TextareaClear({
  forceMount = false,
  className,
  children,
  'aria-label': ariaLabel = 'Clear textarea',
  onPointerDown,
  onClick,
  ref,
  ...props
}: TextareaClearProps) {
  const textarea = useTextareaContext('TextareaClear')
  if (!forceMount && !textarea.canClear) return null

  const clearProps = {
    ...props,
    ...(ref ? { ref } : {}),
    type: 'button' as const,
    'aria-label': ariaLabel,
    'data-slot': 'textarea-clear',
    disabled: !forceMount && !textarea.canClear,
    className: cn(textareaClearClassName, className),
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(event)
      if (!event.defaultPrevented) event.preventDefault()
    },
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (!event.defaultPrevented) textarea.clear()
    },
  } satisfies TextareaClearRenderProps & { ref?: Ref<HTMLButtonElement> }

  if (typeof children === 'function') return children(clearProps)

  return <Button {...clearProps}>{children ?? <XIcon />}</Button>
}
