import type { AlertUiOptions } from '@/components/primitive/alert/utils'
import { CircleCheckIcon } from '@/components/icons/circle-check'
import { CircleXIcon } from '@/components/icons/circle-x'
import { InfoIcon } from '@/components/icons/info'
import { TriangleAlertIcon } from '@/components/icons/triangle-alert'
import { XIcon } from '@/components/icons/x'

import { cn } from '@/lib/utils'
import { useState, type ComponentProps, type CSSProperties, type ReactNode } from 'react'
import {
  Alert as PrimitiveAlert,
  type AlertProps as PrimitiveAlertProps,
} from '@/components/primitive/alert'

export interface AlertProps
  extends Omit<PrimitiveAlertProps, 'title'>, AlertUiOptions<ReactNode, CSSProperties> {
  onClose?: ComponentProps<'button'>['onClick']
}

const icons = {
  success: CircleCheckIcon,
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: CircleXIcon,
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
          className={cn("row-span-2 mt-0.5 inline-flex size-[var(--alert-icon-size,1rem)] shrink-0 items-center justify-center [&>svg]:size-full", classNames?.icon)}
          style={styles?.icon}
        >
          {icon ?? <BuiltinIcon />}
        </span>
      ) : null}
      <div
        data-slot="alert-content"
        className={cn("min-w-0 self-center", classNames?.content)}
        style={styles?.content}
      >
        {title ? (
          <div
            data-slot="alert-title"
            className={cn("col-start-1 row-start-1 font-medium leading-5 group-has-data-[slot=alert-icon]/alert:col-start-2", classNames?.title)}
            style={styles?.title}
          >
            {title}
          </div>
        ) : null}
        {description || children ? (
          <div
            data-slot="alert-description"
            className={cn("col-start-1 row-start-2 mt-0.5 text-sm leading-5 opacity-85 group-has-data-[slot=alert-icon]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-4 [&_p:not(:last-child)]:mb-4", classNames?.description)}
            style={styles?.description}
          >
            {description ?? children}
          </div>
        ) : null}
      </div>
      {action ? (
        <div
          data-slot="alert-action"
          className={cn("col-start-2 row-start-1 ms-2 shrink-0 group-has-data-[slot=alert-icon]/alert:col-start-3", classNames?.action)}
          style={styles?.action}
        >
          {action}
        </div>
      ) : null}
      {closable ? (
        <button
          type="button"
          aria-label="Close alert"
          data-slot="alert-close"
          className={cn("col-start-3 row-start-1 ms-2 inline-flex size-5 shrink-0 items-center justify-center rounded-sm opacity-55 outline-none group-has-data-[slot=alert-icon]/alert:col-start-4 hover:opacity-100 focus-visible:ring-1 focus-visible:ring-current [&>svg]:size-3.5", classNames?.close)}
          style={styles?.close}
          onClick={(event) => {
            onClose?.(event)
            if (!event.defaultPrevented) setVisible(false)
          }}
        >
          {closeIcon ?? <XIcon />}
        </button>
      ) : null}
    </PrimitiveAlert>
  )
}
