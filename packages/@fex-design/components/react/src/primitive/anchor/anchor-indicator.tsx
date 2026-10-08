import { anchorIndicatorClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import type { CSSProperties, HTMLAttributes } from 'react'
import { useAnchorContext } from './anchor-context'

export interface AnchorIndicatorProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
  style?: CSSProperties
}

export function AnchorIndicator({ className, style, ...props }: AnchorIndicatorProps) {
  const anchor = useAnchorContext('AnchorIndicator')
  return anchor.inkStyles.map((inkStyle, index) => (
    <span
      {...props}
      data-slot="anchor-indicator"
      key={String(inkStyle.top ?? inkStyle.left) + '-' + index}
      className={cn(anchorIndicatorClassName({ orientation: anchor.orientation }), className)}
      style={{ ...style, ...inkStyle }}
    />
  ))
}
