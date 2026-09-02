import type { AlertUiOptions } from '@fex-design/core/alert/types'
import { CircleCheckIcon } from '../../icon/circle-check'
import { CircleErrorIcon } from '../../icon/circle-error'
import { CircleInfoIcon } from '../../icon/circle-info'
import { CircleWarningIcon } from '../../icon/circle-warning'
import { CloseIcon } from '../../icon/close'
import {
  alertActionClassName,
  alertCloseClassName,
  alertContentClassName,
  alertDescriptionClassName,
  alertIconClassName,
  alertTitleClassName,
} from '@fex-design/styles/alert'
import { cn } from '@fex/utils'
import { useState, type ComponentProps, type CSSProperties, type ReactNode } from 'react'
import { Alert as PrimitiveAlert, type AlertProps as PrimitiveAlertProps } from '../../primitive/alert/alert'

export interface AlertProps
  extends Omit<PrimitiveAlertProps, 'title'>,
    AlertUiOptions<ReactNode, CSSProperties> {
  onClose?: ComponentProps<'button'>['onClick']
}

const icons = {
  success: CircleCheckIcon,
  info: CircleInfoIcon,
  warning: CircleWarningIcon,
  error: CircleErrorIcon,
}

export function Alert({
  type = 'info',
  variant = 'filled',
  title,
  description,
  showIcon = false,
  icon,
  action,
  closable = false,
  closeIcon,
  onClose,
  className,
  style,
  classNames,
  styles,
  children,
  ...props
}: AlertProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  const BuiltinIcon = icons[type]
  return (
    <PrimitiveAlert
      {...props}
      type={type}
      variant={variant}
      className={cn(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      {showIcon ? (
        <span
          aria-hidden="true"
          data-slot="alert-icon"
          className={cn(alertIconClassName, classNames?.icon)}
          style={styles?.icon}
        >
          {icon ?? <BuiltinIcon />}
        </span>
      ) : null}
      <div data-slot="alert-content" className={cn(alertContentClassName, classNames?.content)} style={styles?.content}>
        {title ? <div data-slot="alert-title" className={cn(alertTitleClassName, classNames?.title)} style={styles?.title}>{title}</div> : null}
        {description || children ? <div data-slot="alert-description" className={cn(alertDescriptionClassName, classNames?.description)} style={styles?.description}>{description ?? children}</div> : null}
      </div>
      {action ? <div data-slot="alert-action" className={cn(alertActionClassName, classNames?.action)} style={styles?.action}>{action}</div> : null}
      {closable ? (
        <button
          type="button"
          aria-label="Close alert"
          data-slot="alert-close"
          className={cn(alertCloseClassName, classNames?.close)}
          style={styles?.close}
          onClick={(event) => { onClose?.(event); if (!event.defaultPrevented) setVisible(false) }}
        >
          {closeIcon ?? <CloseIcon />}
        </button>
      ) : null}
    </PrimitiveAlert>
  )
}
