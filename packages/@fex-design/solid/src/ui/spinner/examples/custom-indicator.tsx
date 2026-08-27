import { SpinnerContainer } from '@fex-design/solid/ui/spinner'
export function CustomIndicatorExample() { return <SpinnerContainer spinning indicator={<BouncingDots />} /> }
function BouncingDots() { return <span class="inline-flex items-center gap-1 text-fuchsia-600" aria-hidden="true"><i class="size-1 rounded-full bg-current animate-bounce" /><i class="size-1 rounded-full bg-current animate-bounce [animation-delay:120ms]" /><i class="size-1 rounded-full bg-current animate-bounce [animation-delay:240ms]" /></span> }
