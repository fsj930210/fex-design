import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import type { ComponentProps, JSX, ParentProps } from 'solid-js'
import type {
  CardClassNames as CardClassNamesBase,
  CardOptions,
  CardStyles as CardStylesBase,
} from '@fex-design/core/card/types'
import { Show, splitProps } from 'solid-js'
import { cn } from '@fex-design/utils'
import {
  Card as PrimitiveCard,
  CardContent,
  CardDescription,
  CardExtra,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/solid/primitive/card'

export type CardClassNames = CardClassNamesBase
export type CardStyles = CardStylesBase<JSX.CSSProperties>

export interface CardProps
  extends
    ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'>>,
    CardOptions<JSX.Element, JSX.CSSProperties> {
  headerProps?: Omit<ComponentProps<typeof CardHeader>, 'children'> | undefined
  titleProps?: Omit<ComponentProps<typeof CardTitle>, 'children'> | undefined
  descriptionProps?: Omit<ComponentProps<typeof CardDescription>, 'children'> | undefined
  extraProps?: Omit<ComponentProps<typeof CardExtra>, 'children'> | undefined
  contentProps?: Omit<ComponentProps<typeof CardContent>, 'children'> | undefined
  footerProps?: Omit<ComponentProps<typeof CardFooter>, 'children'> | undefined
}

export function Card(props: CardProps) {
  const [local, rest] = splitProps(props, [
    'headerProps',
    'titleProps',
    'descriptionProps',
    'extraProps',
    'contentProps',
    'footerProps',
    'title',
    'description',
    'extra',
    'header',
    'footer',
    'classNames',
    'styles',
    'children',
  ])

  return (
    <PrimitiveCard
      {...rest}
      class={cn(rest.class, local.classNames?.root)}
      style={mergeStyle(rest.style, local.styles?.root)}
    >
      <Show
        when={local.header}
        fallback={
          <Show when={local.title || local.description || local.extra}>
            <CardHeader
              {...local.headerProps}
              class={cn(local.classNames?.header, local.headerProps?.class)}
              style={mergeStyle(local.styles?.header, local.headerProps?.style)}
            >
              <Show when={local.title}>
                <CardTitle
                  {...local.titleProps}
                  class={cn(local.classNames?.title, local.titleProps?.class)}
                  style={mergeStyle(local.styles?.title, local.titleProps?.style)}
                >
                  {local.title}
                </CardTitle>
              </Show>
              <Show when={local.description}>
                <CardDescription
                  {...local.descriptionProps}
                  class={cn(local.classNames?.description, local.descriptionProps?.class)}
                  style={mergeStyle(local.styles?.description, local.descriptionProps?.style)}
                >
                  {local.description}
                </CardDescription>
              </Show>
              <Show when={local.extra}>
                <CardExtra
                  {...local.extraProps}
                  class={cn(local.classNames?.extra, local.extraProps?.class)}
                  style={mergeStyle(local.styles?.extra, local.extraProps?.style)}
                >
                  {local.extra}
                </CardExtra>
              </Show>
            </CardHeader>
          </Show>
        }
      >
        {local.header}
      </Show>
      <CardContent
        {...local.contentProps}
        class={cn(local.classNames?.content, local.contentProps?.class)}
        style={mergeStyle(local.styles?.content, local.contentProps?.style)}
      >
        {local.children}
      </CardContent>
      <Show when={local.footer}>
        <CardFooter
          {...local.footerProps}
          class={cn(local.classNames?.footer, local.footerProps?.class)}
          style={mergeStyle(local.styles?.footer, local.footerProps?.style)}
        >
          {local.footer}
        </CardFooter>
      </Show>
    </PrimitiveCard>
  )
}
