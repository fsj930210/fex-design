import { createImageLoadingController } from '@fex-design/core/image/create-image-loading-controller'
import { loadImage } from '@fex/utils/image/load-image'
import { ref, type InjectionKey, type Ref } from 'vue'
export const avatarContext: InjectionKey<{
  controller: ReturnType<typeof createImageLoadingController>
  status: Ref<string>
}> = Symbol('avatar')
export function createAvatarContext() {
  const controller = createImageLoadingController(loadImage)
  const status = ref(controller.getStatus())
  controller.subscribe(() => {
    status.value = controller.getStatus()
  })
  return { controller, status }
}
