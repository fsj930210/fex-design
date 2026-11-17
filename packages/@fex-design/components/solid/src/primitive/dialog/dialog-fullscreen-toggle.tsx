import { dialogIconCloseClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import { onCleanup } from 'solid-js'
import type { JSX } from 'solid-js'
import { useDialog } from './dialog-context'
import { Button } from '../button'
import { ExpandIcon } from '../../icons/expand'
import { ShrinkIcon } from '../../icons/shrink'
export interface DialogFullscreenToggleProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element
}
export function DialogFullscreenToggle(props: DialogFullscreenToggleProps) {
  const context = useDialog('DialogFullscreenToggle')
  const setting = () => context.fullscreen()
  const onFullscreenChange = () => context.onFullscreenChange?.(document.fullscreenElement !== null)
  document.addEventListener('fullscreenchange', onFullscreenChange)
  onCleanup(() => document.removeEventListener('fullscreenchange', onFullscreenChange))
  async function toggle() {
    const value = setting()
    if (!value) return
    const mode = value === true ? 'viewport' : value.mode
    if (mode === 'screen') {
      const element = document.getElementById(context.contentId)
      if (element && document.fullscreenElement !== element) {
        try {
          await element.requestFullscreen()
        } catch {
          context.setFullscreenActive(true)
          context.onFullscreenChange?.(true)
          return
        }
      } else if (document.fullscreenElement) await document.exitFullscreen()
    }
    const next =
      mode === 'screen' ? document.fullscreenElement !== null : !context.fullscreenActive()
    context.setFullscreenActive(next)
    context.onFullscreenChange?.(next)
  }
  return (
    <Button
      {...props}
      type={props.type ?? 'button'}
      data-slot="dialog-fullscreen-toggle"
      class={cn(dialogIconCloseClassName, props.class)}
      onClick={toggle}
      hidden={!setting()}
    >
      {props.children ??
        props.icon ??
        (context.fullscreenActive() ? (
          <ShrinkIcon aria-hidden="true" />
        ) : (
          <ExpandIcon aria-hidden="true" />
        ))}
    </Button>
  )
}
