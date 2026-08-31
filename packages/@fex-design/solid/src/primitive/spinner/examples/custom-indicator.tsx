import { Spinner } from '@fex-design/solid/primitive/spinner'
export default function CustomIndicator() {
  return (
    <Spinner aria-label="自定义加载">
      <span class="inline-flex items-center gap-1 text-fuchsia-600" aria-hidden="true">
        <i class="size-1 rounded-full bg-current animate-bounce" />
        <i class="size-1 rounded-full bg-current animate-bounce [animation-delay:120ms]" />
        <i class="size-1 rounded-full bg-current animate-bounce [animation-delay:240ms]" />
      </span>
    </Spinner>
  )
}
