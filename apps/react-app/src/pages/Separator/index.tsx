import { BasicDemo } from './basic-demo'
import { ListDemo } from './list-demo'
import { MenuDemo } from './menu-demo'
import { TextDemo } from './text-demo'
import { VariantsDemo } from './variants-demo'
import { VerticalDemo } from './vertical-demo'
export function SeparatorPage() {
  return (
    <main className="grid gap-4 p-2 md:p-6">
      <BasicDemo />
      <VerticalDemo />
      <MenuDemo />
      <ListDemo />
      <TextDemo />
      <VariantsDemo />
    </main>
  )
}
