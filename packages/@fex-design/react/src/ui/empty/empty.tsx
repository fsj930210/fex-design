import type {
  EmptyClassNames as EmptyClassNamesBase,
  EmptyOptions,
  EmptyStyles as EmptyStylesBase,
} from '@fex-design/core/empty/types'
import { cn } from '@fex/utils'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import {
  Empty as PrimitiveEmpty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../../primitive/empty/empty'

export type EmptyClassNames = EmptyClassNamesBase
export type EmptyStyles = EmptyStylesBase<CSSProperties>

export interface EmptyProps
  extends Omit<ComponentProps<'div'>, 'title' | 'children'>,
    EmptyOptions<ReactNode, CSSProperties> {
  children?: ReactNode
}

function renderImage(image: ReactNode | string | null | undefined) {
  if (image === null) return null
  if (typeof image === 'string') return <img src={image} alt="" />
  return image ?? <DefaultEmptyImage />
}

function DefaultEmptyImage() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="currentColor" opacity="0.1" />
      <path d="M14 19.5h8l2.5 3H34v10.5a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V19.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Empty({ image, title, description, className, style, classNames, styles, children, ...props }: EmptyProps) {
  const resolvedImage = renderImage(image)
  const hasHeader = resolvedImage != null || title != null || description != null

  return (
    <PrimitiveEmpty {...props} className={cn(className, classNames?.root)} style={{ ...style, ...styles?.root }}>
      {hasHeader ? (
        <EmptyHeader className={classNames?.header} style={styles?.header}>
          {resolvedImage != null ? <EmptyMedia className={classNames?.image} style={styles?.image}>{resolvedImage}</EmptyMedia> : null}
          {title != null ? <EmptyTitle className={classNames?.title} style={styles?.title}>{title}</EmptyTitle> : null}
          {description != null ? <EmptyDescription className={classNames?.description} style={styles?.description}>{description}</EmptyDescription> : null}
        </EmptyHeader>
      ) : null}
      {children != null ? <EmptyContent className={classNames?.content} style={styles?.content}>{children}</EmptyContent> : null}
    </PrimitiveEmpty>
  )
}

export { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
