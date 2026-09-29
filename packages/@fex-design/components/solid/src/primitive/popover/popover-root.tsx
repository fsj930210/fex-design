import { createMemo, splitProps, type JSX } from 'solid-js'
import type { PopoverOptions, PopoverRenderState } from '@fex-design/core/popover/types'
import { PopoverContext } from './popover-context'
import { createPopover } from './create-popover'

export type PopoverProps = PopoverOptions & {
  children?: JSX.Element | ((state: PopoverRenderState) => JSX.Element)
}

function PopoverChildren(props: Pick<PopoverProps, 'children'> & { state: PopoverRenderState }) {
  const content = createMemo(() => props.children)
  const value = content()
  return <>{typeof value === 'function' ? value(props.state) : value}</>
}

export function Popover(props: PopoverProps) {
  const [local, options] = splitProps(props, ['children'])
  const context = createPopover(() => options)
  const state = {
    get open() {
      return context.snapshot().open
    },
    close: context.overlay.close,
  }
  return (
    <PopoverContext.Provider value={context}>
      <PopoverChildren state={state}>{local.children}</PopoverChildren>
    </PopoverContext.Provider>
  )
}

export { Popover as PopoverRoot }
export type PopoverRootProps = PopoverProps
