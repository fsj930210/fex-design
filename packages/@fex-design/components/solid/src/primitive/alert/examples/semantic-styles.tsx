import { Alert, AlertIcon, AlertTitle, AlertAction } from '@fex-design/solid/primitive/alert'
import { InfoIcon } from '@fex-design/solid/icons/info'
import { XIcon } from '@fex-design/solid/icons/x'
import { alertCloseClassName, alertContentClassName } from '@fex-design/components-styles/alert'
import { createSignal, type JSX } from 'solid-js'
export function AlertSemanticStylesExample() {
  const [purpleVisible, setPurpleVisible] = createSignal(true)
  const [pinkVisible, setPinkVisible] = createSignal(true)
  return (
    <div class="grid w-full max-w-sm gap-4">
      {purpleVisible() && (
        <Alert
          style={
            {
              '--alert-color': '#7c3aed',
              '--alert-color-background': '#f5f3ff',
              '--alert-color-border': '#c4b5fd',
            } as JSX.CSSProperties
          }
        >
          <AlertIcon aria-hidden="true" class="rounded-full bg-white/70 p-0.5">
            <InfoIcon />
          </AlertIcon>
          <div data-slot="alert-content" class={alertContentClassName}>
            <AlertTitle class="uppercase tracking-wide">Custom purple semantic parts</AlertTitle>
          </div>
          <button
            type="button"
            data-slot="alert-close"
            aria-label="Close alert"
            class={alertCloseClassName}
            onClick={() => setPurpleVisible(false)}
          >
            <XIcon />
          </button>
        </Alert>
      )}
      {pinkVisible() && (
        <Alert
          style={
            {
              '--alert-color': '#be185d',
              '--alert-color-background': '#fdf2f8',
              '--alert-color-border': '#f9a8d4',
            } as JSX.CSSProperties
          }
        >
          <AlertIcon aria-hidden="true" class="">
            <InfoIcon />
          </AlertIcon>
          <div data-slot="alert-content" class={alertContentClassName}>
            <AlertTitle class="">Custom pink semantic parts</AlertTitle>
          </div>
          <AlertAction
            style={{
              'border-radius': '999px',
              background: 'rgb(255 255 255 / 0.7)',
              padding: '2px 8px',
            }}
          >
            <button>Action</button>
          </AlertAction>
          <button
            type="button"
            data-slot="alert-close"
            aria-label="Close alert"
            class={alertCloseClassName}
            style={{ color: '#831843' }}
            onClick={() => setPinkVisible(false)}
          >
            <XIcon />
          </button>
        </Alert>
      )}
    </div>
  )
}
