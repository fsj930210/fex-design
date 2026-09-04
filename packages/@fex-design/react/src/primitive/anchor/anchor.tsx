import type {
  AnchorActiveMode,
  AnchorOrientation,
  AnchorRegisteredItem,
  AnchorTarget,
} from '@fex-design/core/anchor/types'
import {
  anchorIndicatorClassName,
  anchorItemClassName,
  anchorLinkClassName,
  anchorListClassName,
  anchorRailClassName,
  anchorRootClassName,
} from '@fex-design/styles/anchor'
import { cn } from '@fex/utils'
import {
  use,
  useEffect,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react'
import { AnchorContext, AnchorItemContext, useAnchorContext } from './anchor-context'
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

export function AnchorList({ className, children, ...props }: HTMLAttributes<HTMLUListElement>) {
  const anchor = useAnchorContext('AnchorList')
  return (
    <ul
      {...props}
      data-slot="anchor-list"
      className={cn(anchorListClassName({ orientation: anchor.orientation }), className)}
    >
      {children}
    </ul>
  )
}

export interface AnchorItemProps extends HTMLAttributes<HTMLLIElement> {
  value: string
  target: AnchorTarget
  targetOffset?: number
}

export function AnchorItem({
  value,
  target,
  targetOffset,
  className,
  children,
  ...props
}: AnchorItemProps) {
  const anchor = useAnchorContext('AnchorItem')
  const parent = use(AnchorItemContext)
  const item: AnchorRegisteredItem = {
    key: value,
    target,
    ...(targetOffset === undefined ? {} : { targetOffset }),
    ...(parent ? { parentKey: parent.key } : {}),
  }

  // Registration synchronizes this composed item with the shared anchor controller.
  useEffect(
    () => anchor.registerItem(item),
    [anchor.registerItem, parent?.key, target, targetOffset, value],
  )

  const active = anchor.activeKeys.includes(value)
  const highlighted = anchor.highlightedKeys.has(value)
  return (
    <AnchorItemContext value={item}>
      <li
        {...props}
        data-slot="anchor-item"
        data-active={active || undefined}
        data-highlighted={highlighted || undefined}
        className={cn(anchorItemClassName, className)}
      >
        {children}
      </li>
    </AnchorItemContext>
  )
}

export type AnchorLinkProps = ButtonHTMLAttributes<HTMLButtonElement>

export function AnchorLink({ className, children, onClick, ...props }: AnchorLinkProps) {
  const anchor = useAnchorContext('AnchorLink')
  const item = use(AnchorItemContext)
  if (!item) throw new Error('AnchorLink must be used inside AnchorItem')
  const active = anchor.activeKeys.includes(item.key)
  const highlighted = anchor.highlightedKeys.has(item.key)
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      data-slot="anchor-link"
      data-anchor-key={item.key}
      data-state={active ? 'active' : 'inactive'}
      className={cn(
        anchorLinkClassName({ orientation: anchor.orientation, active: highlighted }),
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) anchor.activate(item)
      }}
    >
      {children}
    </button>
  )
}

export function AnchorRail({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const anchor = useAnchorContext('AnchorRail')
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="anchor-rail"
      className={cn(anchorRailClassName({ orientation: anchor.orientation }), className)}
    >
      {children}
    </div>
  )
}

export interface AnchorIndicatorProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
  style?: CSSProperties
}

export function AnchorIndicator({ className, style, ...props }: AnchorIndicatorProps) {
  const anchor = useAnchorContext('AnchorIndicator')
  return anchor.inkStyles.map((inkStyle, index) => (
    <span
      {...props}
      data-slot="anchor-indicator"
      key={`${String(inkStyle.top ?? inkStyle.left)}-${index}`}
      className={cn(anchorIndicatorClassName({ orientation: anchor.orientation }), className)}
      style={{ ...style, ...inkStyle }}
    />
  ))
}

export type { AnchorActiveMode, AnchorOrientation, AnchorRegisteredItem, AnchorTarget }
export { useAnchor }
