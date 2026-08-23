import {
  AnimationDemo,
  AvatarDemo,
  BasicDemo,
  CardDemo,
  FormDemo,
  TableDemo,
  TextDemo,
} from './demos'
export function SkeletonPage() {
  return (
    <main class="grid gap-4 p-2 md:p-6">
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
