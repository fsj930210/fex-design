import type { JSX, ParentProps } from 'solid-js'
import type { CardClassNames as CardClassNamesBase, CardOptions, CardStyles as CardStylesBase } from '@fex-design/core/card/types'
import { Show, splitProps } from 'solid-js'
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
export type CardStyles = CardStylesBase<JSX.CSSProperties>

export interface CardProps extends ParentProps<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'>
>, CardOptions<JSX.Element, JSX.CSSProperties> {}

export function Card(props: CardProps) {
  const [local, rest] = splitProps(props, [
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
      style={{ ...rest.style, ...local.styles?.root }}
    >
      <Show when={local.header} fallback={<Show when={local.title || local.description || local.extra}>
        <CardHeader class={local.classNames?.header} style={local.styles?.header}>
          <Show when={local.title}>
            <CardTitle class={local.classNames?.title} style={local.styles?.title}>
              {local.title}
            </CardTitle>
          </Show>
          <Show when={local.description}>
            <CardDescription class={local.classNames?.description} style={local.styles?.description}>
              {local.description}
            </CardDescription>
          </Show>
          <Show when={local.extra}><CardExtra class={local.classNames?.extra} style={local.styles?.extra}>{local.extra}</CardExtra></Show>
        </CardHeader>
      </Show>}>
        {local.header}
      </Show>
      <CardContent class={local.classNames?.content} style={local.styles?.content}>
        {local.children}
      </CardContent>
      <Show when={local.footer}>
        <CardFooter class={local.classNames?.footer} style={local.styles?.footer}>
          {local.footer}
        </CardFooter>
      </Show>
    </PrimitiveCard>
  )
}
