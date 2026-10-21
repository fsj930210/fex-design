import type { SwitchUiOptions } from '@fex-design/core/switch/types'
import { cn } from '@fex-design/utils'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import {
  SwitchRoot,
  SwitchContent,
  SwitchThumb,
  type SwitchRootProps,
} from '@fex-design/react/primitive/switch'
import { Spinner } from '@fex-design/react/primitive/spinner'
export type SwitchProps = Omit<SwitchRootProps, 'children'> &
  SwitchUiOptions<ReactNode, CSSProperties> & {
    checkedContentProps?:
      | Omit<ComponentProps<typeof SwitchContent>, 'children' | 'state'>
      | undefined
    uncheckedContentProps?:
      | Omit<ComponentProps<typeof SwitchContent>, 'children' | 'state'>
      | undefined
    thumbProps?: Omit<ComponentProps<typeof SwitchThumb>, 'children'> | undefined
    spinnerProps?: Omit<ComponentProps<typeof Spinner>, 'aria-hidden'> | undefined
  }
export function Switch({
  checkedContentProps,
  uncheckedContentProps,
  thumbProps,
  spinnerProps,
  checkedContent,
  uncheckedContent,
  loading = false,
  className,
  style,
  classNames,
  styles,
  ...props
}: SwitchProps) {
  return (
    <SwitchRoot
      {...props}
      loading={loading}
      className={cn(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      {checkedContent != null && (
        <SwitchContent
          {...checkedContentProps}
          state="checked"
          className={cn(classNames?.content, checkedContentProps?.className)}
          style={{ ...styles?.content, ...checkedContentProps?.style }}
        >
          {checkedContent}
        </SwitchContent>
      )}
      {uncheckedContent != null && (
        <SwitchContent
          {...uncheckedContentProps}
          state="unchecked"
          className={cn(classNames?.content, uncheckedContentProps?.className)}
          style={{ ...styles?.content, ...uncheckedContentProps?.style }}
        >
          {uncheckedContent}
        </SwitchContent>
      )}
      <SwitchThumb
        {...thumbProps}
        className={cn(classNames?.thumb, thumbProps?.className)}
        style={{ ...styles?.thumb, ...thumbProps?.style }}
      >
        {loading && <Spinner {...spinnerProps} aria-hidden="true" />}
      </SwitchThumb>
    </SwitchRoot>
  )
}
