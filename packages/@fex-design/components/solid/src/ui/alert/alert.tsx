import type { AlertUiOptions } from '@fex-design/core/alert/types'
import {
  alertActionClassName,
  alertCloseClassName,
  alertContentClassName,
  alertDescriptionClassName,
  alertIconClassName,
  alertTitleClassName,
} from '@fex-design/components-styles/alert'
import { cn } from '@fex-design/utils'
import { createSignal, splitProps, type JSX } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { CircleCheckIcon } from '@fex-design/solid/icons/circle-check'
import { XIcon } from '@fex-design/solid/icons/x'
import { CircleXIcon } from '@fex-design/solid/icons/circle-x'
import { InfoIcon } from '@fex-design/solid/icons/info'
import { TriangleAlertIcon } from '@fex-design/solid/icons/triangle-alert'
import {
  Alert as PrimitiveAlert,
  type AlertProps as PrimitiveAlertProps,
} from '@fex-design/solid/primitive/alert/alert'

export type AlertProps = Omit<PrimitiveAlertProps, 'title'> &
  AlertUiOptions<JSX.Element, JSX.CSSProperties> & {
    onClose?: JSX.EventHandler<HTMLButtonElement, MouseEvent>
  }

const icons = {
  success: CircleCheckIcon,
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: CircleXIcon,
}

export function Alert(props: AlertProps) {
  const [visible, setVisible] = createSignal(true)
  const [local, rest] = splitProps(props, [
    'type',
    'variant',
    'title',
    'description',
    'showIcon',
    'icon',
    'action',
    'closable',
    'closeIcon',
    'onClose',
    'class',
    'style',
    'classNames',
    'styles',
    'children',
  ])
  const type = () => local.type ?? 'info'
  return visible() ? (
    <PrimitiveAlert
      {...rest}
      type={type()}
      variant={local.variant ?? 'filled'}
      class={cn(local.class, local.classNames?.root)}
      style={{ ...(typeof local.style === 'object' ? local.style : {}), ...local.styles?.root }}
    >
      {local.showIcon ? (
        <span
          aria-hidden="true"
          data-slot="alert-icon"
          class={cn(alertIconClassName, local.classNames?.icon)}
          style={local.styles?.icon}
        >
          {local.icon ?? <Dynamic component={icons[type()]} />}
        </span>
      ) : null}
      <div
        data-slot="alert-content"
        class={cn(alertContentClassName, local.classNames?.content)}
        style={local.styles?.content}
      >
        {local.title ? (
          <div
            data-slot="alert-title"
            class={cn(alertTitleClassName, local.classNames?.title)}
            style={local.styles?.title}
          >
            {local.title}
          </div>
        ) : null}
        {local.description || local.children ? (
          <div
            data-slot="alert-description"
            class={cn(alertDescriptionClassName, local.classNames?.description)}
            style={local.styles?.description}
          >
            {local.description ?? local.children}
          </div>
        ) : null}
      </div>
      {local.action ? (
        <div
          data-slot="alert-action"
          class={cn(alertActionClassName, local.classNames?.action)}
          style={local.styles?.action}
        >
          {local.action}
        </div>
      ) : null}
      {local.closable ? (
        <button
          type="button"
          aria-label="Close alert"
          data-slot="alert-close"
          class={cn(alertCloseClassName, local.classNames?.close)}
          style={local.styles?.close}
          onClick={(event) => {
            local.onClose?.(event)
            if (!event.defaultPrevented) setVisible(false)
          }}
        >
          {local.closeIcon ?? <XIcon />}
        </button>
      ) : null}
    </PrimitiveAlert>
  ) : null
}
