import { createImageLoadingController } from '@fex-design/core/image/create-image-loading-controller'
import { loadImage } from '@fex/utils/image/load-image'
import { Injectable, signal } from '@angular/core'
@Injectable()
export class AvatarContext {
  readonly controller = createImageLoadingController(loadImage)
  readonly status = signal(this.controller.getStatus())
  constructor() {
    this.controller.subscribe(() => this.status.set(this.controller.getStatus()))
  }
}
