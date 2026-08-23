import { BasicDemo, ListDemo, MenuDemo, TextDemo, VariantsDemo, VerticalDemo } from './demos'
export function SeparatorPage() {
  return (
    <main class="grid gap-4 p-2 md:p-6">
      <BasicDemo />
      <VerticalDemo />
      <MenuDemo />
      <ListDemo />
      <TextDemo />
      <VariantsDemo />
    </main>
  )
}
