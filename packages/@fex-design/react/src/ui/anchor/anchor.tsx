import type {
  AnchorClassNames,
  AnchorItem as AnchorItemData,
  AnchorStyles as AnchorStylesBase,
} from '@fex-design/core/anchor/types'
import { cn } from '@fex/utils'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
  type AnchorRootProps,
} from '../../primitive/anchor/anchor'

export type AnchorStyles = AnchorStylesBase<CSSProperties>
export type AnchorUiItem = AnchorItemData<ReactNode>

export interface AnchorProps extends Omit<AnchorRootProps, 'children'> {
  items: readonly AnchorUiItem[]
  classNames?: AnchorClassNames
  styles?: AnchorStyles
  onItemClick?: (event: MouseEvent<HTMLButtonElement>, item: AnchorUiItem) => void
}

export function Anchor({ items, className, style, classNames, styles, onItemClick, ...props }: AnchorProps) {
  const renderItems = (entries: readonly AnchorUiItem[]): ReactNode => (
    <AnchorList className={classNames?.list} style={styles?.list}>
      {entries.map((item) => (
        <AnchorItem
          key={item.key}
          value={item.key}
          target={item.target}
          {...(item.targetOffset === undefined ? {} : { targetOffset: item.targetOffset })}
          className={classNames?.item}
          style={styles?.item}
        >
          <AnchorLink className={classNames?.link} style={styles?.link} onClick={(event) => onItemClick?.(event, item)}>
            {item.title}
          </AnchorLink>
          {item.children?.length ? renderItems(item.children) : null}
        </AnchorItem>
      ))}
    </AnchorList>
  )

  return (
    <AnchorRoot
      {...props}
      className={cn(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      <AnchorRail className={classNames?.rail} style={styles?.rail}>
        <AnchorIndicator className={classNames?.indicator} style={styles?.indicator} />
      </AnchorRail>
      {renderItems(items)}
    </AnchorRoot>
  )
}

export type { AnchorClassNames, AnchorItemData }
