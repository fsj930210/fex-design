import type { InjectionKey } from 'vue'
import type { ScrollbarOverflow } from '@fex-design/core/scrollbar/types'

export const scrollbarKey: InjectionKey<() => ScrollbarOverflow | undefined> = Symbol('Scrollbar')
