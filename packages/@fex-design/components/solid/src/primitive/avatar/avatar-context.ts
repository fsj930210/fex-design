import { createImageLoadingController } from '@fex-design/core/image/create-image-loading-controller'
import { createContext, useContext, type Accessor } from 'solid-js'

export interface AvatarContextValue {
  status: Accessor<string>
  controller: ReturnType<typeof createImageLoadingController>
}

export const AvatarContext = createContext<AvatarContextValue>()

export function useAvatarContext(component: string) {
  const context = useContext(AvatarContext)
  if (!context) throw new Error(`${component} must be used inside Avatar`)
  return context
}
