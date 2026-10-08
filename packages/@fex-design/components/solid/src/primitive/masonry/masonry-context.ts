import type {
  MasonryController,
} from '@fex-design/core/masonry/create-masonry-controller'
import type { MasonryControllerOptions } from '@fex-design/core/masonry/types'
import {
  createContext,
  useContext,
  type Accessor,
} from 'solid-js'

export interface MasonryContextValue {
  controller: MasonryController
  options: Accessor<MasonryControllerOptions>
}

export const MasonryContext = createContext<MasonryContextValue>()

export function useMasonryContext(part: string) {
  const value = useContext(MasonryContext)
  if (!value) throw new Error(`${part} must be used inside MasonryRoot.`)
  return value
}
