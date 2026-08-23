import { AnimationDemo } from './animation-demo'
import { AvatarDemo } from './avatar-demo'
import { BasicDemo } from './basic-demo'
import { CardDemo } from './card-demo'
import { FormDemo } from './form-demo'
import { TableDemo } from './table-demo'
import { TextDemo } from './text-demo'
export function SkeletonPage() {
  return (
    <main className="grid gap-4 p-2 md:p-6">
      <BasicDemo />
      <AvatarDemo />
      <CardDemo />
      <TextDemo />
      <FormDemo />
      <TableDemo />
      <AnimationDemo />
    </main>
  )
}
