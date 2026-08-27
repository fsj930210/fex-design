import type { SpinnerContainerOptions, SpinnerOptions } from '@fex-design/core/spinner/types'
import { spinnerContainerClassName, spinnerOverlayClassName } from '@fex-design/styles/spinner'
import { cn } from '@fex/utils'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import {
  Spinner,
  SpinnerContainer as PrimitiveSpinnerContainer,
  SpinnerText,
} from '../../primitive/spinner/spinner'

export { Spinner }

export interface SpinnerContainerProps
  extends
    Omit<ComponentProps<'div'>, 'children'>,
    SpinnerContainerOptions<ReactNode, CSSProperties>,
    SpinnerOptions {
  children?: ReactNode
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
  ...props
}: SpinnerContainerProps) {
  if (spinning === undefined) {
    return (
      <Spinner size={size} className={cn(className, classNames?.spinner)} style={styles?.spinner}>
        {indicator}
      </Spinner>
    )
  }
  return (
    <PrimitiveSpinnerContainer
      {...props}
      aria-busy={spinning}
      className={cn(spinnerContainerClassName, className, classNames?.root)}
      style={styles?.root}
    >
      {children}
      {spinning ? (
        <div
          data-slot="spinner-overlay"
          className={cn(spinnerOverlayClassName, classNames?.overlay, text && 'flex-col')}
          style={styles?.overlay}
        >
          <Spinner
            size={size}
            className={cn(classNames?.spinner, classNames?.indicator)}
            style={{ ...styles?.spinner, ...styles?.indicator }}
          >
            {indicator}
          </Spinner>
          {text ? (
            <SpinnerText className={classNames?.text} style={styles?.text}>
              {text}
            </SpinnerText>
          ) : null}
        </div>
      ) : null}
    </PrimitiveSpinnerContainer>
  )
}
