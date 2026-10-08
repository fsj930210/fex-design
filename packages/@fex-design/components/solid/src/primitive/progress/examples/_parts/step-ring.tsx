import { For, Show, createMemo } from 'solid-js'
import { Progress, ProgressCircle, ProgressValue } from '@fex-design/solid/primitive/progress'
import { CheckIcon } from '@fex-design/solid/icons/check'
import { getCircleStepsGeometry } from '@fex-design/core/progress/progress'

export function StepRingDemo(props: { value: number; gap?: number; steps?: number; color?: string }) {
  const value = () => props.value
  const geometry = createMemo(() => getCircleStepsGeometry({ value: props.value, gap: props.gap ?? 2, steps: props.steps ?? 10, size: 96, thickness: 4 }))
  const ringColor = () => props.color ?? (props.value === 100 ? 'var(--success)' : 'var(--info)')
  return (
    <Progress value={value()} variant="circle" size={96} thickness={4} class="relative">
      <ProgressCircle>
        <For each={geometry().steps}>{step => (
          <circle
            cx={48}
            cy={48}
            r={geometry().radius}
            fill="none"
            stroke={step.active ? ringColor() : 'var(--progress-remaining)'}
            stroke-width={4}
            stroke-dasharray={geometry().stepDasharray}
            stroke-dashoffset={step.offset}
            stroke-linecap="butt"
            pathLength={geometry().circumference}
          />
        )}</For>
      </ProgressCircle>
      <div class="absolute inset-0 flex items-center justify-center">
        <Show when={value() === 100} fallback={
          <ProgressValue class="text-sm">
            {value()}%
          </ProgressValue>
        }>
          <CheckIcon class="size-5 text-success" />
        </Show>
      </div>
    </Progress>
  )
}
