import { createImageLoadingController } from '@fex-design/core/image/create-image-loading-controller'
import { createContext, use } from 'react'

export interface AvatarContextValue {
  controller: ReturnType<typeof createImageLoadingController>
}

export const AvatarContext = createContext<AvatarContextValue | null>(null)

export function useAvatarContext(component: string) {
  const context = use(AvatarContext)
  if (!context) throw new Error(`${component} must be used inside Avatar`)
  return context
}
