import { createImageLoadingController } from '@fex-design/core/image/create-image-loading-controller'
import type { ImageLoadingStatus } from '@fex-design/core/image/types'
import { loadImage } from '@fex/utils/image/load-image'
import { writable, type Writable } from 'svelte/store'
export const avatarContextKey = Symbol('avatar')
export type AvatarContext = { controller: ReturnType<typeof createImageLoadingController>; status: Writable<ImageLoadingStatus> }
export function createAvatarContext() {
  const controller = createImageLoadingController(loadImage)
  const status = writable(controller.getStatus())
  controller.subscribe(() => status.set(controller.getStatus()))
  return { controller, status }
}
