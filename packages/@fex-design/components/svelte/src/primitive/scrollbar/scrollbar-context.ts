import type { ScrollbarOverflow } from '@fex-design/core/scrollbar/types'

export const scrollbarKey = Symbol('Scrollbar')
export type ScrollbarContext = () => ScrollbarOverflow | undefined
