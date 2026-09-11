import type { HTMLButtonAttributes } from 'svelte/elements'
import type { PopoverController } from '@fex-design/core/popover/create-popover'

export interface PopoverTriggerBinding {
  action: (element: HTMLElement) => { destroy: () => void }
  props: HTMLButtonAttributes
  state: ReturnType<PopoverController['getSnapshot']>
}
