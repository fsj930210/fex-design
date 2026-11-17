import { dialogIconCloseClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import { useEffect, type ComponentProps, type MouseEvent, type ReactNode } from 'react'
import { useDialog } from './use-dialog'
import { Button } from '../button'
import { ExpandIcon } from '../../icons/expand'
import { ShrinkIcon } from '../../icons/shrink'

export interface DialogFullscreenToggleProps extends ComponentProps<'button'> {
  icon?: ReactNode
}

export function DialogFullscreenToggle({
  className,
  onClick,
  icon,
  type = 'button',
  ...props
}: DialogFullscreenToggleProps) {
  const { contentId, fullscreen, fullscreenActive, setFullscreenActive, onFullscreenChange } =
    useDialog('DialogFullscreenToggle')
  const mode = fullscreen === true ? 'viewport' : fullscreen?.mode
  useEffect(() => {
    if (mode !== 'screen') return
    const onChange = () => onFullscreenChange?.(document.fullscreenElement !== null)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [mode, onFullscreenChange])
  if (!mode) return null

  return (
    <Button
      {...props}
      type={type}
      data-slot="dialog-fullscreen-toggle"
      aria-label={props['aria-label'] ?? 'Toggle fullscreen'}
      className={cn(dialogIconCloseClassName, className)}
      onClick={async (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (mode === 'screen') {
          const element = document.getElementById(contentId)
          if (element && document.fullscreenElement !== element) {
            try {
              await element.requestFullscreen()
            } catch {
              setFullscreenActive(true)
              onFullscreenChange?.(true)
              return
            }
          } else if (document.fullscreenElement) await document.exitFullscreen()
        }
        const next = mode === 'screen' ? document.fullscreenElement !== null : !fullscreenActive
        setFullscreenActive(next)
        onFullscreenChange?.(next)
      }}
    >
      {props.children ??
        icon ??
        (fullscreenActive ? <ShrinkIcon aria-hidden="true" /> : <ExpandIcon aria-hidden="true" />)}
    </Button>
  )
}
