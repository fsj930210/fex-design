import type { PopoverController } from '@fex-design/core/popover/create-popover'
type Snapshot = ReturnType<PopoverController['getSnapshot']>
export const selectOpen = (snapshot: Snapshot) => snapshot.open
export const selectContent = ({ mounted, open, phase, side, align, placement }: Snapshot) =>
  ({ mounted, open, phase, side, align, placement })

export const selectPortal = ({ mounted, popupContainer }: Snapshot) => ({ mounted, popupContainer })
export const selectArrow = ({ arrow, side }: Snapshot) => ({ arrow, side })
