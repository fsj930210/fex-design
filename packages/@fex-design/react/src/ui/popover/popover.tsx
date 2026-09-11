import { useCoreStoreSelector } from '../../hooks/use-core-store-selector'
import { usePopoverContext } from '../../primitive/popover/popover-context'
import { selectOpen } from '../../primitive/popover/selectors'
import {
  cloneElement,
  type ComponentProps,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import type {
  PopoverClassNames,
  PopoverOptions,
  PopoverRenderState,
  PopoverSemanticPart,
} from '@fex-design/core/popover/types'
import { splitPopoverOptions } from '@fex-design/core/popover/options'
import { cn } from '@fex/utils'
import {
  Popover as PrimitivePopover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverPortal,
  PopoverTitle,
  usePopoverTrigger,
} from '../../primitive/popover/popover'

export interface PopoverProps
  extends PopoverOptions, Omit<ComponentProps<'div'>, 'children' | 'title' | 'content'> {
  children: ReactElement<ComponentProps<'button'>>
  title?: ReactNode
  content?: ReactNode | ((state: PopoverRenderState) => ReactNode)
  classNames?: PopoverClassNames
  styles?: Partial<Record<PopoverSemanticPart, CSSProperties>>
}

function Trigger({ children }: Pick<PopoverProps, 'children'>) {
  const trigger = usePopoverTrigger(children.props)
  return cloneElement(children, trigger.props)
}

function Content({ render }: { render: (state: PopoverRenderState) => ReactNode }) {
  const { overlay } = usePopoverContext('PopoverContent')
  const open = useCoreStoreSelector(overlay, selectOpen)
  return render({ open, close: overlay.close })
}

export function Popover(props: PopoverProps) {
  const [options, contentProps] = splitPopoverOptions(props)
  const { children, title, content, className, style, classNames, styles, ...nativeProps } =
    contentProps
  return (
    <PrimitivePopover {...options}>
      <Trigger>{children}</Trigger>
      <PopoverPortal>
        <PopoverContent
          {...nativeProps}
          className={cn(className, classNames?.root)}
          style={{ ...style, ...styles?.root }}
        >
          <PopoverArrow className={classNames?.arrow} style={styles?.arrow} />
          {title != null ? (
            <PopoverHeader>
              <PopoverTitle className={classNames?.title} style={styles?.title}>
                {title}
              </PopoverTitle>
            </PopoverHeader>
          ) : null}
          <div data-slot="popover-body" className={classNames?.content} style={styles?.content}>
            {typeof content === 'function' ? <Content render={content} /> : content}
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PrimitivePopover>
  )
}

export { usePopover } from '../../primitive/popover/popover'
export type {
  PopoverOptions,
  PopoverClassNames,
  PopoverSemanticPart,
} from '@fex-design/core/popover/types'
