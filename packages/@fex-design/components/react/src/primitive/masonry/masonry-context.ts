import type { MasonryController } from '@fex-design/core/masonry/create-masonry-controller'
import type { MasonryControllerOptions } from '@fex-design/core/masonry/types'
import { createContext, use } from 'react'

export interface MasonryContextValue {
  controller: MasonryController
  options: MasonryControllerOptions
}

export const MasonryContext = createContext<MasonryContextValue | null>(null)

export function useMasonryContext() {
  const value = use(MasonryContext)
  if (!value) throw new Error('Masonry parts must be used within MasonryRoot')
  return value
}
