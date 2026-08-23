import { ContentDemo } from './content-demo'
import { ShapeDemo } from './shape-demo'
import { SizeDemo } from './size-demo'
import { GroupDemo } from './group-demo'
export function AvatarPage() {
  return (
    <main class="grid gap-4 p-2 md:p-6">
      <SizeDemo />
      <ShapeDemo />
      <ContentDemo />
      <GroupDemo />
    </main>
  )
}
