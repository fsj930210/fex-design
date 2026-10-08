import { CheckIcon } from '@fex-design/solid/icons/check'
import { Match, Switch } from 'solid-js'
import type { ProgressProps } from './types'
import type { useProgress } from './use-progress'

export function ProgressInfo(props: { model: ReturnType<typeof useProgress>; format?: ProgressProps['format'] }) {
  const percentage = () => props.model.normalized().percentage
  const percent = () => percentage() === null ? null : Math.round(percentage()! * 100)
  return (
    <Switch fallback={percent() === null ? '' : `${percent()}%`}>
      <Match when={props.format}>{props.format?.(percent(), props.model.normalized().value)}</Match>
      <Match when={props.model.status() === 'success' && props.model.variant() !== 'line'}>
        <CheckIcon class="size-6 text-success" />
      </Match>
      <Match when={props.model.status() === 'success' && percentage() !== null && percentage()! >= 1}>
        <span class="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white">
          <CheckIcon class="size-3" />
        </span>
      </Match>
    </Switch>
  )
}
