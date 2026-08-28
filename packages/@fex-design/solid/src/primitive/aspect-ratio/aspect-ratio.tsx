import { aspectRatioClassName } from '@fex-design/styles/aspect-ratio'
import { cn } from '@fex/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import type { AspectRatioOptions } from '@fex-design/core/aspect-ratio/types'
export function AspectRatio(
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>> & AspectRatioOptions,
) {
  const [local, rest] = splitProps(props, ['class', 'style', 'children', 'ratio'])
  return (
    <div
      {...rest}
      data-slot="aspect-ratio"
      class={cn(aspectRatioClassName, local.class)}
      style={{
        'aspect-ratio': local.ratio,
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
    >
      {local.children}
    </div>
  )
}
