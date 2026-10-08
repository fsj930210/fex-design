import { anchorRootClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { AnchorContext } from './anchor-context'
import { useAnchor, type UseAnchorOptions } from './use-anchor'

export interface AnchorRootProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'>, UseAnchorOptions {
  children: ReactNode
  ref?: Ref<HTMLElement>
}

export function AnchorRoot({
  activeKeys,
  activeMode,
  behavior,
  threshold,
  children,
  className,
  container,
  defaultActiveKeys,
  onChange,
  orientation,
  ref,
  targetOffset,
  ...props
}: AnchorRootProps) {
  const anchor = useAnchor({
    ...(activeKeys === undefined ? {} : { activeKeys }),
    ...(activeMode === undefined ? {} : { activeMode }),
    ...(behavior === undefined ? {} : { behavior }),
    ...(threshold === undefined ? {} : { threshold }),
    ...(container === undefined ? {} : { container }),
    ...(defaultActiveKeys === undefined ? {} : { defaultActiveKeys }),
    ...(onChange === undefined ? {} : { onChange }),
    ...(orientation === undefined ? {} : { orientation }),
    ...(targetOffset === undefined ? {} : { targetOffset }),
  })
  return (
    <AnchorContext value={anchor}>
      <nav
        {...props}
        ref={(element) => {
          anchor.rootRef.current = element
          if (typeof ref === 'function') ref(element)
          else if (ref) ref.current = element
        }}
        data-slot="anchor"
        data-orientation={anchor.orientation}
        className={cn(anchorRootClassName({ orientation: anchor.orientation }), className)}
      >
        {children}
      </nav>
    </AnchorContext>
  )
}
