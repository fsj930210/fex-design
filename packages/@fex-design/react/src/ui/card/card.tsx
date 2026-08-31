import { type ComponentProps, type ReactNode } from 'react'
import type {
  CardClassNames as CardClassNamesBase,
  CardOptions,
  CardStyles as CardStylesBase,
} from '@fex-design/core/card/types'
import { cn } from '@fex/utils'
import {
  Card as PrimitiveCard,
  CardContent,
  CardDescription,
  CardExtra,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../primitive/card/card'

export type CardClassNames = CardClassNamesBase
export type CardStyles = CardStylesBase<React.CSSProperties>

export interface CardProps
  extends Omit<ComponentProps<'div'>, 'title'>, CardOptions<ReactNode, React.CSSProperties> {}

export function Card({
  title,
  description,
  extra,
  header,
  footer,
  className,
  style,
  classNames,
  styles,
  children,
  ...props
}: CardProps) {
  return (
    <PrimitiveCard
      {...props}
      className={cn(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      {header ??
        (title || description || extra ? (
          <CardHeader className={classNames?.header} style={styles?.header}>
            {title ? (
              <CardTitle className={classNames?.title} style={styles?.title}>
                {title}
              </CardTitle>
            ) : null}
            {description ? (
              <CardDescription className={classNames?.description} style={styles?.description}>
                {description}
              </CardDescription>
            ) : null}
            {extra ? (
              <CardExtra className={classNames?.extra} style={styles?.extra}>
                {extra}
              </CardExtra>
            ) : null}
          </CardHeader>
        ) : null)}
      <CardContent className={classNames?.content} style={styles?.content}>
        {children}
      </CardContent>
      {footer ? (
        <CardFooter className={classNames?.footer} style={styles?.footer}>
          {footer}
        </CardFooter>
      ) : null}
    </PrimitiveCard>
  )
}
