import { Alert, AlertIcon, AlertTitle, AlertAction } from '@fex-design/react/primitive/alert'
import { InfoIcon } from '@fex-design/react/icons/info'
import { XIcon } from '@fex-design/react/icons/x'
import { alertCloseClassName, alertContentClassName } from '@fex-design/components-styles/alert'
import { useState, type CSSProperties } from 'react'
export function AlertSemanticStylesExample() {
  const [purpleVisible, setPurpleVisible] = useState(true)
  const [pinkVisible, setPinkVisible] = useState(true)
  return (
    <div className="grid w-full max-w-sm gap-4">
      {purpleVisible && (
        <Alert
          style={
            {
              '--alert-color': '#7c3aed',
              '--alert-color-background': '#f5f3ff',
              '--alert-color-border': '#c4b5fd',
            } as CSSProperties
          }
        >
          <AlertIcon aria-hidden="true" className="rounded-full bg-white/70 p-0.5">
            <InfoIcon />
          </AlertIcon>
          <div data-slot="alert-content" className={alertContentClassName}>
            <AlertTitle className="uppercase tracking-wide">
              Custom purple semantic parts
            </AlertTitle>
          </div>
          <button
            type="button"
            data-slot="alert-close"
            aria-label="Close alert"
            className={alertCloseClassName}
            onClick={() => setPurpleVisible(false)}
          >
            <XIcon />
          </button>
        </Alert>
      )}
      {pinkVisible && (
        <Alert
          style={
            {
              '--alert-color': '#be185d',
              '--alert-color-background': '#fdf2f8',
              '--alert-color-border': '#f9a8d4',
            } as CSSProperties
          }
        >
          <AlertIcon aria-hidden="true" className="">
            <InfoIcon />
          </AlertIcon>
          <div data-slot="alert-content" className={alertContentClassName}>
            <AlertTitle className="">Custom pink semantic parts</AlertTitle>
          </div>
          <AlertAction
            style={{ borderRadius: 999, background: 'rgb(255 255 255 / 0.7)', padding: '2px 8px' }}
          >
            <button>Action</button>
          </AlertAction>
          <button
            type="button"
            data-slot="alert-close"
            aria-label="Close alert"
            className={alertCloseClassName}
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
