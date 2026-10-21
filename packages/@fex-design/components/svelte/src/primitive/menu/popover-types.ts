import type { HTMLAttributes } from 'svelte/elements'
import type { MenuPopoverProps as CoreMenuPopoverProps } from '@fex-design/core/menu/types'

export type MenuPopoverProps = CoreMenuPopoverProps<HTMLAttributes<HTMLDivElement>['style']>
