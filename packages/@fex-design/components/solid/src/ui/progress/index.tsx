import {
  progressStepLineContainerClassName, progressStepLineItemClassName,
  progressStepLineTrackClassName, progressTopHeaderClassName,
} from '@fex-design/components-styles/progress'
import {
  Progress as PrimitiveProgress, ProgressCircle, ProgressCircleRange, ProgressCircleTrack,
  ProgressLabel, ProgressRange, ProgressTrack,
} from '@fex-design/solid/primitive/progress'
import { cn } from '@fex-design/utils'
import { createUniqueId, For, Match, Show, splitProps, Switch } from 'solid-js'
import { ProgressInfo } from './progress-info'
import type { ProgressProps } from './types'
import { useProgress } from './use-progress'

export function Progress(props: ProgressProps) {
  const [p, rest] = splitProps(props, ['value', 'min', 'max', 'variant', 'status', 'size', 'thickness',
    'ranges', 'steps', 'gap', 'color', 'trackColor', 'linecap', 'trackLinecap', 'gapDegree', 'gapPlacement',
    'showInfo', 'showValue', 'infoPlacement', 'label', 'format', 'success', 'classNames', 'styles', 'class', 'style'])
  const m = useProgress(p)
  const gradientId = createUniqueId().replace(/:/g, '')
  const info = () => <ProgressInfo model={m} format={p.format} />
  return (
    <Switch fallback={
      <PrimitiveProgress {...rest} value={m.value()} min={m.min()} max={m.max()} variant="line"
        status={m.status()} thickness={m.thickness()}
        class={cn('flex flex-col w-full', p.classNames?.root, p.class)} style={m.rootStyle()}>
        <Show when={m.placement() !== 'bottom' && (p.label || (m.showInfo() && m.placement() === 'top'))}>
          <div class={cn(progressTopHeaderClassName, p.classNames?.label)}>
            <Show when={p.label} fallback={<span />}><ProgressLabel>{p.label}</ProgressLabel></Show>
            <Show when={m.showInfo() && m.placement() === 'top'}>
              <span class={cn('text-muted-foreground', p.classNames?.info)} style={p.styles?.info}>{info()}</span>
            </Show>
          </div>
        </Show>
        <div class={cn('flex w-full items-center', m.placement() === 'inside' && 'relative')}>
          <ProgressTrack class={cn('min-w-0 flex-1', p.classNames?.track)} style={m.trackStyle()}>
            <Show when={m.rangeLayout()} fallback={<ProgressRange class={p.classNames?.range} style={m.rangeStyle()} />}>{(layout) =>
              <For each={layout().ranges}>{(range) => <ProgressRange value={range.value} offset={range.offset} class={p.classNames?.range}
                style={{ 'border-radius': '0', background: range.color ?? 'var(--primary)', ...p.styles?.range }} />}</For>
            }</Show>
          </ProgressTrack>
          <Show when={m.showInfo() && m.placement() === 'outside'}>
            <span class={cn('ms-2 shrink-0 text-sm font-medium', p.classNames?.info)} style={p.styles?.info}>{info()}</span>
          </Show>
          <Show when={m.showInfo() && m.placement() === 'inside'}>
            <span class={cn('pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm font-medium text-white', p.classNames?.info)} style={p.styles?.info}>{info()}</span>
          </Show>
        </div>
        <Show when={m.showInfo() && m.placement() === 'bottom'}>
          <div class="mt-1.5 flex w-full items-center justify-between text-sm">
            <Show when={p.label} fallback={<span />}><ProgressLabel class={p.classNames?.label}>{p.label}</ProgressLabel></Show>
            <span class={cn('font-medium', p.classNames?.info)} style={p.styles?.info}>{info()}</span>
          </div>
        </Show>
      </PrimitiveProgress>
    }>
      <Match when={m.lineSteps()}>
        <div {...rest} data-slot="progress" data-variant="steps"
          class={cn(progressStepLineContainerClassName, p.classNames?.root, p.class)} style={m.rootStyle()}>
          <div class={cn(progressStepLineTrackClassName, p.classNames?.track)} style={p.styles?.track}>
            <For each={m.lineSteps()?.steps}>{step =>
              <span data-slot="progress-step" data-active={step.active ? 'true' : undefined}
                class={cn(progressStepLineItemClassName, p.classNames?.step)}
                style={{ background: step.active ? m.activeColor() : p.trackColor ?? 'var(--progress-remaining)', ...p.styles?.step }} />
            }</For>
          </div>
          <Show when={m.showInfo()}><span class={cn('text-sm font-medium', p.classNames?.info)} style={p.styles?.info}>{info()}</span></Show>
        </div>
      </Match>
      <Match when={m.circleSteps()}>
        <div {...rest} data-slot="progress" data-variant="circle-steps"
          class={cn('relative inline-flex items-center justify-center', p.classNames?.root, p.class)}
          style={typeof m.rootStyle() === 'string'
            ? `width: ${m.circleSteps()!.size}px; height: ${m.circleSteps()!.size}px; ${m.rootStyle()}`
            : { width: `${m.circleSteps()!.size}px`, height: `${m.circleSteps()!.size}px`, ...m.rootStyle() as object }}>
          <svg viewBox={`0 0 ${m.circleSteps()!.size} ${m.circleSteps()!.size}`}
            width={m.circleSteps()!.size} height={m.circleSteps()!.size} class="block shrink-0 -rotate-90">
            <For each={m.circleSteps()?.steps}>{step =>
              <circle cx={m.circleSteps()!.size / 2} cy={m.circleSteps()!.size / 2} r={m.circleSteps()!.radius}
                fill="none" stroke={step.active ? m.stepColor(step.index) : p.trackColor ?? 'var(--progress-remaining)'}
                stroke-width={m.circleSteps()!.thickness} stroke-dasharray={m.circleSteps()!.stepDasharray}
                stroke-dashoffset={step.offset} stroke-linecap={m.linecap()} />
            }</For>
          </svg>
          <Show when={m.showInfo()}>
            <div class={cn('absolute inset-0 flex items-center justify-center text-sm font-medium', p.classNames?.info)} style={p.styles?.info}>{info()}</div>
          </Show>
        </div>
      </Match>
      <Match when={m.isCircle()}>
        <PrimitiveProgress {...rest} value={m.value()} min={m.min()} max={m.max()} variant={m.variant()}
          status={m.status()} size={m.size()} thickness={m.thickness()}
          class={cn('relative inline-flex items-center justify-center', p.classNames?.root, p.class)} style={m.rootStyle()}>
          <ProgressCircle gapDegree={m.variant() === 'dashboard' ? p.gapDegree ?? 75 : undefined}
            rotation={m.variant() === 'dashboard' && p.gapPlacement === 'top' ? 315 : undefined}
            class={p.classNames?.track} style={p.styles?.track}>
            <Show when={m.gradient()}>
              <defs><linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <For each={m.gradient()}>{stop => <stop offset={stop.offset} stop-color={stop.color} />}</For>
              </linearGradient></defs>
            </Show>
            <ProgressCircleTrack gapDegree={m.variant() === 'dashboard' ? p.gapDegree ?? 75 : undefined} trackLinecap={p.trackLinecap} />
            <ProgressCircleRange stroke={typeof p.color === 'string' ? p.color : m.gradient() ? `url(#${gradientId})` : undefined}
              linecap={m.linecap()} gapDegree={m.variant() === 'dashboard' ? p.gapDegree ?? 75 : undefined}
              class={p.classNames?.range} style={p.styles?.range} />
          </ProgressCircle>
          <Show when={m.showInfo()}>
            <div class={cn('absolute inset-0 flex items-center justify-center font-medium', p.classNames?.info)} style={p.styles?.info}>{info()}</div>
          </Show>
        </PrimitiveProgress>
      </Match>
    </Switch>
  )
}

export type { ProgressProps } from './types'
export type {
  ProgressRangeItem, ProgressColor, ProgressGapPlacement, ProgressInfoPlacement, ProgressLinecap,
  ProgressSize, ProgressStatus, ProgressVariant,
} from '@fex-design/core/progress/types'
