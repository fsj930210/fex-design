import { For } from 'solid-js'
import { Button } from '@fex-design/solid/ui/button'

const variants = [
  'default',
  'outline',
  'secondary',
  'ghost',
  'destructive',
  'link',
  'dashed',
] as const

export function VariantsExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <For each={variants}>{(item) => <Button variant={item}>{item}</Button>}</For>
    </div>
  )
}
