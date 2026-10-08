import { For, Show } from 'solid-js'
import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/solid/primitive/progress'
import { CheckIcon } from '@fex-design/solid/icons/check'

export function StepLineDemo(props: { value: number; active: number }) {
  const value = () => props.value
  const active = () => props.active
  const indices = [0, 1, 2, 3, 4]
  return (
    <div class="inline-flex items-center gap-1.5">
      <Progress value={value()} class="contents">
        <ProgressTrack class="flex h-auto w-auto min-w-0 items-center gap-1 overflow-visible bg-transparent">
          <For each={indices}>{index => (
            <ProgressRange
              value={1}
              style={{"width":"1rem"}}
              class={index < active() ? 'h-2 flex-none rounded-[1px] bg-info' : 'h-2 flex-none rounded-[1px] bg-[var(--progress-remaining)]'}
            />
          )}</For>
        </ProgressTrack>
        <Show when={active() < 5} fallback={
          <span class="flex size-4 items-center justify-center rounded-full bg-success text-white">
            <CheckIcon class="size-3" />
          </span>
        }>
          <ProgressValue class="text-sm">
            {value()}%
          </ProgressValue>
        </Show>
      </Progress>
    </div>
  )
}
