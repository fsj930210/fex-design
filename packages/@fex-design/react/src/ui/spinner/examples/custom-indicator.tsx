import { SpinnerContainer } from '@fex-design/react/ui/spinner'

export function CustomIndicatorExample() {
  return <SpinnerContainer spinning indicator={<BouncingDots />} />
}

function BouncingDots() {
  return (
    <span className="inline-flex items-center gap-1 text-fuchsia-600" aria-hidden="true">
      <i className="size-1 rounded-full bg-current animate-bounce" />
      <i className="size-1 rounded-full bg-current animate-bounce [animation-delay:120ms]" />
      <i className="size-1 rounded-full bg-current animate-bounce [animation-delay:240ms]" />
    </span>
  )
}
