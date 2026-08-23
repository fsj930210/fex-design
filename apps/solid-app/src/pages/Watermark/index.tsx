import { A } from '@solidjs/router'
import { BasicDemo } from './basic-demo'
import { CustomConfigDemo } from './custom-config-demo'
import { ImageDemo } from './image-demo'
import { ModalDrawerDemo } from './modal-drawer-demo'
import { MultilineDemo } from './multiline-demo'
import { RestoreDemo } from './restore-demo'

export function WatermarkPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-2">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <h1 class="text-2xl font-semibold text-foreground">Watermark</h1>
          <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
            Add repeated text watermarks over content, including image previews.
          </p>
        </header>
        <div class="grid gap-4">
          <BasicDemo />
          <MultilineDemo />
          <ImageDemo />
          <CustomConfigDemo />
          <ModalDrawerDemo />
          <RestoreDemo />
        </div>
      </div>
    </main>
  )
}
