import { Spinner } from '@fex-design/react/primitive/spinner'

export function CustomIndicatorExample() {
  return <Spinner aria-label="自定义加载"><BouncingDots /></Spinner>
}

function BouncingDots() {
  return <span className="inline-flex items-center gap-1 text-fuchsia-600" aria-hidden="true"><i className="size-1 rounded-full bg-current animate-bounce" /><i className="size-1 rounded-full bg-current animate-bounce [animation-delay:120ms]" /><i className="size-1 rounded-full bg-current animate-bounce [animation-delay:240ms]" /></span>
}
