import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import type {
  AnchorClassNames,
  AnchorItem as AnchorItemData,
  AnchorStyles as AnchorStylesBase,
} from '@fex-design/core/anchor/types'
import { cn } from '@fex-design/utils'
import { For, Show, splitProps, type JSX } from 'solid-js'
import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
  type AnchorRootProps,
} from '@fex-design/solid/primitive/anchor'
export type AnchorStyles = AnchorStylesBase<JSX.CSSProperties>
export interface AnchorProps extends Omit<AnchorRootProps, 'children'> {
  items: readonly AnchorItemData<JSX.Element>[]
  classNames?: AnchorClassNames
  styles?: AnchorStyles
  onItemClick?: (event: MouseEvent, item: AnchorItemData<JSX.Element>) => void
}
function AnchorItems(
  props: Pick<AnchorProps, 'items' | 'classNames' | 'styles' | 'onItemClick'> & { depth: number },
) {
  return (
    <AnchorList
      class={props.classNames?.list}
      style={{
        'padding-inline-start': '0',
        ...props.styles?.list,
      }}
    >
      <For each={props.items}>
        {(item) => (
          <AnchorItem
            value={item.key}
            target={item.target}
            {...(item.targetOffset === undefined ? {} : { targetOffset: item.targetOffset })}
            class={props.classNames?.item}
            style={props.styles?.item}
          >
            <AnchorLink
              class={props.classNames?.link}
              style={{
                'padding-inline-start': `calc(0.5rem + ${props.depth} * var(--anchor-indent, 1.5rem))`,
                ...props.styles?.link,
              }}
              onClick={(event) => props.onItemClick?.(event, item)}
            >
              {item.title}
            </AnchorLink>
            <Show when={item.children?.length}>
              {item.children ? (
                <AnchorItems
                  items={item.children}
                  classNames={props.classNames}
                  styles={props.styles}
                  onItemClick={props.onItemClick}
                  depth={props.depth + 1}
                />
              ) : null}
            </Show>
          </AnchorItem>
        )}
      </For>
    </AnchorList>
  )
}
export function Anchor(props: AnchorProps) {
  const [local, rest] = splitProps(props, [
    'items',
    'classNames',
    'styles',
    'onItemClick',
    'class',
    'style',
  ])
  return (
    <AnchorRoot
      {...rest}
      class={cn(local.class, local.classNames?.root)}
      style={mergeStyle(local.style, local.styles?.root)}
    >
      <AnchorRail class={local.classNames?.rail} style={local.styles?.rail}>
        <AnchorIndicator class={local.classNames?.indicator} style={local.styles?.indicator} />
      </AnchorRail>
      <AnchorItems
        items={local.items}
        classNames={local.classNames}
        styles={local.styles}
        onItemClick={local.onItemClick}
        depth={0}
      />
    </AnchorRoot>
  )
}
export type { AnchorClassNames, AnchorItemData }
