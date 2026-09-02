import type { EmptyOptions, EmptyStyles as EmptyStylesBase } from '@fex-design/core/empty/types'
import { cn } from '@fex/utils'
import { Show, splitProps, type JSX, type ParentProps } from 'solid-js'
import {
  Empty as PrimitiveEmpty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../../primitive/empty/empty'

export type EmptyStyles = EmptyStylesBase<JSX.CSSProperties>
export interface EmptyProps
  extends ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'>>,
    EmptyOptions<JSX.Element, JSX.CSSProperties> {}

function DefaultEmptyImage() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect width="48" height="48" rx="12" fill="currentColor" opacity="0.1" /><path d="M14 19.5h8l2.5 3H34v10.5a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V19.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /><path d="M20 28h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
}

export function Empty(props: EmptyProps) {
  const [local, rest] = splitProps(props, ['image', 'title', 'description', 'classNames', 'styles', 'children'])
  const image = () => local.image === null ? null : typeof local.image === 'string' ? <img src={local.image} alt="" /> : (local.image ?? <DefaultEmptyImage />)

  return (
    <PrimitiveEmpty {...rest} class={cn(rest.class, local.classNames?.root)} style={{ ...rest.style, ...local.styles?.root }}>
      <Show when={image() != null || local.title != null || local.description != null}>
        <EmptyHeader class={local.classNames?.header} style={local.styles?.header}>
          <Show when={image()}>{(value) => <EmptyMedia class={local.classNames?.image} style={local.styles?.image}>{value()}</EmptyMedia>}</Show>
          <Show when={local.title != null}><EmptyTitle class={local.classNames?.title} style={local.styles?.title}>{local.title}</EmptyTitle></Show>
          <Show when={local.description != null}><EmptyDescription class={local.classNames?.description} style={local.styles?.description}>{local.description}</EmptyDescription></Show>
        </EmptyHeader>
      </Show>
      <Show when={local.children != null}><EmptyContent class={local.classNames?.content} style={local.styles?.content}>{local.children}</EmptyContent></Show>
    </PrimitiveEmpty>
  )
}

export { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
