import { Badge } from '@fex-design/solid/primitive/badge'
import { badgeRootClassName } from '@fex-design/components-styles/badge'
import { cn } from '@fex-design/utils'
export function BadgeSemanticStylesExample() {
  return (
    <span
      data-slot="badge-root"
      class={cn(badgeRootClassName, 'rounded-xl bg-violet-50 p-3')}
      style={{ outline: '2px dashed #7c3aed' }}
    >
      <span
        data-slot="badge-content"
        class="rounded-lg bg-violet-100 text-violet-950"
        style={{ padding: '16px 20px' }}
      >
        结构化样式
      </span>
      <Badge count={8} class="font-bold" style={{ background: '#7c3aed' }} />
    </span>
  )
}
