import type { SwitchUiOptions } from '@fex-design/core/switch/types'
import { cn } from '@fex/utils'
import type { CSSProperties, ReactNode } from 'react'
import { SwitchRoot, SwitchContent, SwitchThumb, type SwitchRootProps } from '../../primitive/switch/switch'
import { Spinner } from '../../primitive/spinner/spinner'
export type SwitchProps = Omit<SwitchRootProps, 'children'> & SwitchUiOptions<ReactNode, CSSProperties>
export function Switch({
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
      {checkedContent != null && <SwitchContent state="checked" className={classNames?.content} style={styles?.content}>{checkedContent}</SwitchContent>}
      {uncheckedContent != null && <SwitchContent state="unchecked" className={classNames?.content} style={styles?.content}>{uncheckedContent}</SwitchContent>}
      <SwitchThumb className={classNames?.thumb} style={styles?.thumb}>{loading && <Spinner aria-hidden="true" />}</SwitchThumb>
    </SwitchRoot>
  )
}
