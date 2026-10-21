import { createContext, type Accessor } from 'solid-js'
import type { ScrollbarOverflow } from '@fex-design/core/scrollbar/types'

export const ScrollbarContext = createContext<Accessor<ScrollbarOverflow | undefined>>(
  () => undefined,
)
