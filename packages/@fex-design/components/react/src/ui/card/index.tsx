import { type ComponentProps, type ReactNode } from 'react'
import type {
  CardClassNames as CardClassNamesBase,
  CardOptions,
  CardStyles as CardStylesBase,
} from '@fex-design/core/card/types'
import { cn } from '@fex-design/utils'
import {
  Card as PrimitiveCard,
  CardContent,
  CardDescription,
  CardExtra,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/react/primitive/card'

export type CardClassNames = CardClassNamesBase
export type CardStyles = CardStylesBase<React.CSSProperties>

export interface CardProps
  extends Omit<ComponentProps<'div'>, 'title'>, CardOptions<ReactNode, React.CSSProperties> {
  headerProps?: Omit<ComponentProps<typeof CardHeader>, 'children'> | undefined
  titleProps?: Omit<ComponentProps<typeof CardTitle>, 'children'> | undefined
  descriptionProps?: Omit<ComponentProps<typeof CardDescription>, 'children'> | undefined
  extraProps?: Omit<ComponentProps<typeof CardExtra>, 'children'> | undefined
  contentProps?: Omit<ComponentProps<typeof CardContent>, 'children'> | undefined
  footerProps?: Omit<ComponentProps<typeof CardFooter>, 'children'> | undefined
}

export function Card({
  headerProps,
  titleProps,
  descriptionProps,
  extraProps,
  contentProps,
  footerProps,
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
          <CardHeader
            {...headerProps}
            className={cn(classNames?.header, headerProps?.className)}
            style={{ ...styles?.header, ...headerProps?.style }}
          >
            {title ? (
              <CardTitle
                {...titleProps}
                className={cn(classNames?.title, titleProps?.className)}
                style={{ ...styles?.title, ...titleProps?.style }}
              >
                {title}
              </CardTitle>
            ) : null}
            {description ? (
              <CardDescription
                {...descriptionProps}
                className={cn(classNames?.description, descriptionProps?.className)}
                style={{ ...styles?.description, ...descriptionProps?.style }}
              >
                {description}
              </CardDescription>
            ) : null}
            {extra ? (
              <CardExtra
                {...extraProps}
                className={cn(classNames?.extra, extraProps?.className)}
                style={{ ...styles?.extra, ...extraProps?.style }}
              >
                {extra}
              </CardExtra>
            ) : null}
          </CardHeader>
        ) : null)}
      <CardContent
        {...contentProps}
        className={cn(classNames?.content, contentProps?.className)}
        style={{ ...styles?.content, ...contentProps?.style }}
      >
        {children}
      </CardContent>
      {footer ? (
        <CardFooter
          {...footerProps}
          className={cn(classNames?.footer, footerProps?.className)}
          style={{ ...styles?.footer, ...footerProps?.style }}
        >
          {footer}
        </CardFooter>
      ) : null}
    </PrimitiveCard>
  )
}
