<script lang="ts">
  import {
    progressStepLineContainerClassName, progressStepLineItemClassName,
    progressStepLineTrackClassName, progressTopHeaderClassName,
  } from '@fex-design/components-styles/progress'
  import {
    getProgressRanges, getCircleStepsGeometry, getLineStepsGeometry, getLinearProgressBackground,
    getProgressGradientStops, getProgressStepColor, normalizeProgressValue, resolveProgressStatus,
  } from '@fex-design/core/progress/progress'
  import CheckIcon from '@fex-design/svelte/icons/check'
  import {
    Progress as PrimitiveProgress, ProgressCircle, ProgressCircleRange, ProgressCircleTrack,
    ProgressLabel, ProgressRange, ProgressTrack,
  } from '@fex-design/svelte/primitive/progress'
  import { cn } from '@fex-design/utils'
  import type { ProgressProps } from './types'

  const gradientId = $props.id()
  let {
    ref = $bindable(null), value = 0, min = 0, max = 100, variant = 'line', status,
    size, thickness, ranges, steps, gap = 2, color, trackColor, linecap = 'round', trackLinecap,
    gapDegree = 75, gapPlacement = 'bottom', showInfo, showValue, infoPlacement = 'outside',
    label, format, info, success = false, classNames, styles, class: className, style, ...rest
  }: ProgressProps = $props()

  const rangeLayout = $derived(ranges !== undefined && variant === 'line' && !(steps && steps > 0) ? getProgressRanges(ranges, min, max) : null)
  const effectiveValue = $derived(rangeLayout?.value ?? value)
  const normalized = $derived(normalizeProgressValue(effectiveValue, min, max))
  const effectiveStatus = $derived(success ? 'success' : resolveProgressStatus(status, effectiveValue, min, max))
  const shouldShowInfo = $derived(showInfo ?? showValue ?? (variant === 'line' || infoPlacement === 'inside'))
  const numSize = $derived(typeof size === 'number' ? size
    : size === 'sm' ? (variant === 'line' ? 4 : 32)
    : size === 'lg' ? (variant === 'line' ? 12 : 96) : variant === 'line' ? 8 : 48)
  const numThickness = $derived(thickness ?? (typeof size === 'number' && variant === 'line' ? size
    : size === 'sm' ? 4 : size === 'lg' ? 8 : variant === 'line' ? 8 : 4))
  const isCircle = $derived(variant === 'circle' || variant === 'dashboard')
  const lineSteps = $derived(steps && steps > 0 && !isCircle
    ? getLineStepsGeometry({ value, min, max, steps }) : null)
  const circleSteps = $derived(steps && steps > 0 && isCircle
    ? getCircleStepsGeometry({ value, min, max, steps, size: numSize, thickness: numThickness, gap }) : null)
  const gradient = $derived(getProgressGradientStops(color)?.map(([offset, color]) => ({
    offset: `${Number.parseFloat(offset)}%`, color,
  })))
  const background = $derived(getLinearProgressBackground(color))
  const rootStyle = $derived(`${styles?.root ?? ''}; ${style ?? ''}`)
  const trackStyle = $derived(`height: ${numThickness}px; ${trackColor ? `background-color: ${trackColor};` : ''} ${styles?.track ?? ''}`)
  const rangeStyle = $derived(`${background ? `background: ${background};` : ''} ${styles?.range ?? ''}`)
  const activeColor = $derived(effectiveStatus === 'success' ? 'var(--success)' : background ?? 'var(--primary)')
</script>

{#snippet infoContent()}
  {@const percent = normalized.percentage === null ? null : Math.round(normalized.percentage * 100)}
  {#if info}
    {@render info({ percent, value: normalized.value })}
  {:else if format}
    {format(percent, normalized.value)}
  {:else if effectiveStatus === 'success' && variant !== 'line'}
    <CheckIcon class="size-6 text-success" />
  {:else if effectiveStatus === 'success' && normalized.percentage !== null && normalized.percentage >= 1}
    <span class="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white">
      <CheckIcon class="size-3" />
    </span>
  {:else}
    {percent === null ? '' : `${percent}%`}
  {/if}
{/snippet}

{#snippet labelContent()}
  {#if typeof label === 'function'}{@render label()}{:else}{label}{/if}
{/snippet}

{#if lineSteps}
  <div bind:this={ref} {...rest} data-slot="progress" data-variant="steps"
    class={cn(progressStepLineContainerClassName, classNames?.root, className)} style={rootStyle}>
    <div class={cn(progressStepLineTrackClassName, classNames?.track)} style={styles?.track}>
      {#each lineSteps.steps as step (step.index)}
        <span data-slot="progress-step" data-active={step.active ? 'true' : undefined}
          class={cn(progressStepLineItemClassName, classNames?.step)}
          style="background: {step.active ? activeColor : trackColor ?? 'var(--progress-remaining)'}; {styles?.step ?? ''}"></span>
      {/each}
    </div>
    {#if shouldShowInfo}<span class={cn('text-sm font-medium', classNames?.info)} style={styles?.info}>{@render infoContent()}</span>{/if}
  </div>
{:else if circleSteps}
  <div bind:this={ref} {...rest} data-slot="progress" data-variant="circle-steps"
    class={cn('relative inline-flex items-center justify-center', classNames?.root, className)}
    style="width: {circleSteps.size}px; height: {circleSteps.size}px; {rootStyle}">
    <svg viewBox="0 0 {circleSteps.size} {circleSteps.size}" width={circleSteps.size} height={circleSteps.size}
      class="block shrink-0 -rotate-90">
      {#each circleSteps.steps as step (step.index)}
        <circle cx={circleSteps.size / 2} cy={circleSteps.size / 2} r={circleSteps.radius} fill="none"
          stroke={step.active ? effectiveStatus === 'success' ? 'var(--success)' : getProgressStepColor(color, step.index, steps!) : trackColor ?? 'var(--progress-remaining)'}
          stroke-width={circleSteps.thickness} stroke-dasharray={circleSteps.stepDasharray}
          stroke-dashoffset={step.offset} stroke-linecap={linecap} />
      {/each}
    </svg>
    {#if shouldShowInfo}
      <div class={cn('absolute inset-0 flex items-center justify-center text-sm font-medium', classNames?.info)} style={styles?.info}>{@render infoContent()}</div>
    {/if}
  </div>
{:else if isCircle}
  <PrimitiveProgress bind:ref {...rest} {value} {min} {max} {variant} status={effectiveStatus}
    size={numSize} thickness={numThickness}
    class={cn('relative inline-flex items-center justify-center', classNames?.root, className)} style={rootStyle}>
    <ProgressCircle gapDegree={variant === 'dashboard' ? gapDegree : undefined}
      rotation={variant === 'dashboard' && gapPlacement === 'top' ? 315 : undefined}
      class={classNames?.track} style={styles?.track}>
      {#if gradient}
        <defs><linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          {#each gradient as stop (stop.offset)}<stop offset={stop.offset} stop-color={stop.color} />{/each}
        </linearGradient></defs>
      {/if}
      <ProgressCircleTrack gapDegree={variant === 'dashboard' ? gapDegree : undefined} {trackLinecap} />
      <ProgressCircleRange stroke={typeof color === 'string' ? color : gradient ? `url(#${gradientId})` : undefined}
        {linecap} gapDegree={variant === 'dashboard' ? gapDegree : undefined}
        class={classNames?.range} style={styles?.range} />
    </ProgressCircle>
    {#if shouldShowInfo}
      <div class={cn('absolute inset-0 flex items-center justify-center font-medium', classNames?.info)} style={styles?.info}>{@render infoContent()}</div>
    {/if}
  </PrimitiveProgress>
{:else}
  <PrimitiveProgress bind:ref {...rest} {value} {min} {max} variant="line" status={effectiveStatus}
    thickness={numThickness} class={cn('flex flex-col w-full', classNames?.root, className)} style={rootStyle}>
    {#if infoPlacement !== 'bottom' && (label || (shouldShowInfo && infoPlacement === 'top'))}
      <div class={cn(progressTopHeaderClassName, classNames?.label)}>
        {#if label}<ProgressLabel>{@render labelContent()}</ProgressLabel>{:else}<span></span>{/if}
        {#if shouldShowInfo && infoPlacement === 'top'}
          <span class={cn('text-muted-foreground', classNames?.info)} style={styles?.info}>{@render infoContent()}</span>
        {/if}
      </div>
    {/if}
    <div class={cn('flex w-full items-center', infoPlacement === 'inside' && 'relative')}>
      <ProgressTrack class={cn('min-w-0 flex-1', classNames?.track)} style={trackStyle}>
        {#if rangeLayout}
          {#each rangeLayout.ranges as range (range.index)}
            <ProgressRange value={range.value} offset={range.offset} class={classNames?.range}
              style="border-radius: 0; background: {range.color ?? 'var(--primary)'}; {styles?.range ?? ''}" />
          {/each}
        {:else}
          <ProgressRange class={classNames?.range} style={rangeStyle} />
        {/if}
      </ProgressTrack>
      {#if shouldShowInfo && infoPlacement === 'outside'}
        <span class={cn('ms-2 shrink-0 text-sm font-medium', classNames?.info)} style={styles?.info}>{@render infoContent()}</span>
      {/if}
      {#if shouldShowInfo && infoPlacement === 'inside'}
        <span class={cn('pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm font-medium text-white', classNames?.info)} style={styles?.info}>{@render infoContent()}</span>
      {/if}
    </div>
    {#if shouldShowInfo && infoPlacement === 'bottom'}
      <div class="mt-1.5 flex w-full items-center justify-between text-sm">
        {#if label}<ProgressLabel class={classNames?.label}>{@render labelContent()}</ProgressLabel>{:else}<span></span>{/if}
        <span class={cn('font-medium', classNames?.info)} style={styles?.info}>{@render infoContent()}</span>
      </div>
    {/if}
  </PrimitiveProgress>
{/if}
