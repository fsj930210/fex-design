import { Spinner } from '@fex-design/solid/ui/spinner'
export function SizesExample() {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </div>
  )
}
