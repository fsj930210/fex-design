import type { AnchorTarget } from '@fex-design/core/anchor/types'
import type { Ref } from 'vue'

export interface AnchorItem<TTitle = string> {
  key: string
  title: TTitle
  target: AnchorTarget | Ref<HTMLElement | null>
  targetOffset?: number
  children?: AnchorItem<TTitle>[]
}
