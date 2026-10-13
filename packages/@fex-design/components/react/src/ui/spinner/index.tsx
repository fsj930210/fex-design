import type { SpinnerContainerOptions, SpinnerOptions } from '@fex-design/core/spinner/types'
import { spinnerContainerClassName } from '@fex-design/components-styles/spinner'
import { cn } from '@fex-design/utils'
import type { ComponentProps, CSSProperties, ReactNode, Ref } from 'react'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import {
  Spinner,
  SpinnerContainer as PrimitiveSpinnerContainer,
  SpinnerOverlay,
  SpinnerText,
} from '@fex-design/react/primitive/spinner'

export { Spinner }

export interface SpinnerContainerProps
  extends
    Omit<ComponentProps<'div'>, 'children' | 'ref'>,
    SpinnerContainerOptions<ReactNode, CSSProperties>,
    SpinnerOptions {
  children?: ReactNode
  ref?: Ref<HTMLElement>
}

export function SpinnerContainer({
  children,
  className,
  indicator,
  classNames,
  size = 'md',
  styles,
  spinning,
  text,
  ref,
  style,
  ...props
}: SpinnerContainerProps) {
  const rootRef = useComposedRef(ref)
  if (spinning === undefined) {
    return (
      <Spinner {...props} ref={rootRef} size={size} className={cn(className, classNames?.spinner)} style={{ ...style, ...styles?.spinner }}>
        {indicator}
      </Spinner>
    )
  }
  return (
    <PrimitiveSpinnerContainer
      {...props}
      ref={rootRef}
      aria-busy={spinning}
      className={cn(spinnerContainerClassName, className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      {children}
      {spinning ? (
        <SpinnerOverlay
          className={cn(classNames?.overlay, text && 'flex-col')}
          style={styles?.overlay}
        >
          <Spinner size={size} className={classNames?.spinner} style={styles?.spinner}>
            {indicator}
          </Spinner>
          {text ? (
            <SpinnerText className={classNames?.text} style={styles?.text}>
              {text}
            </SpinnerText>
          ) : null}
        </SpinnerOverlay>
      ) : null}
    </PrimitiveSpinnerContainer>
  )
}
