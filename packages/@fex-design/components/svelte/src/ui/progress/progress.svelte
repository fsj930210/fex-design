<script lang="ts">
  import {
    progressStepLineContainerClassName,
    progressStepLineItemClassName,
    progressStepLineTrackClassName,
    progressTopHeaderClassName,
  } from "@fex-design/components-styles/progress"
  import {
    getCircleStepsGeometry,
    getLineStepsGeometry,
    getLinearProgressBackground,
    normalizeProgressValue,
    resolveProgressStatus,
  } from "@fex-design/core/progress/progress"
  import type {
    ProgressColor,
    ProgressGapPlacement,
    ProgressInfoPlacement,
    ProgressLinecap,
    ProgressSize,
    ProgressStatus,
    ProgressVariant,
  } from "@fex-design/core/progress/types"
  import {
    Progress as PrimitiveProgress,
    ProgressCircle,
    ProgressCircleRange,
    ProgressCircleTrack,
    ProgressLabel,
    ProgressRange,
    ProgressTrack,
  } from "@fex-design/svelte/primitive/progress"
  import { cn } from "@fex-design/utils"
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"

  interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value?: number | null
    min?: number
    max?: number
    variant?: ProgressVariant
    status?: ProgressStatus
    size?: ProgressSize
    thickness?: number
    steps?: number
    gap?: number
    color?: ProgressColor
    trackColor?: string
    linecap?: ProgressLinecap
    trackLinecap?: ProgressLinecap
    gapDegree?: number
    gapPlacement?: ProgressGapPlacement
    showInfo?: boolean
    showValue?: boolean
    infoPlacement?: ProgressInfoPlacement
    label?: Snippet | string
    format?: (percent: number | null, value: number | null) => string
    success?: boolean
    classNames?: Partial<Record<"root" | "track" | "range" | "info" | "label" | "step", string>>
    styles?: Partial<Record<"root" | "track" | "range" | "info" | "label" | "step", string>>
  }

  let {
    value = 0,
    min = 0,
    max = 100,
    variant = "line",
    status,
    size,
    thickness,
    steps,
    gap = 2,
    color,
    trackColor,
    linecap = "round",
    trackLinecap,
    gapDegree = 75,
    gapPlacement = "bottom",
    showInfo,
    showValue,
    infoPlacement = "outside",
    label,
    format,
    success = false,
    classNames,
    styles,
    class: className,
    ...rest
  }: ProgressProps = $props()

  const normalized = $derived(normalizeProgressValue(value, min, max))
  const isComplete = $derived(normalized.percentage !== null && normalized.percentage >= 1)
  const effectiveStatus = $derived<ProgressStatus>(success ? "success" : resolveProgressStatus(status, value, min, max))
  const isSuccess = $derived(effectiveStatus === "success")
  const shouldShowInfo = $derived(
    showInfo ?? showValue ?? (variant === "line" || infoPlacement === "inside")
  )

  const numSize = $derived.by(() => {
    if (typeof size === "number") return size
    if (size === "sm") return variant === "line" ? 4 : 32
    if (size === "lg") return variant === "line" ? 12 : 96
    return variant === "line" ? 8 : 48
  })

  const numThickness = $derived.by(() => {
    if (thickness !== undefined) return thickness
    if (typeof size === "number" && variant === "line") return size
    if (size === "sm") return 4
    if (size === "lg") return 8
    return variant === "line" ? 8 : 4
  })

  const lineSteps = $derived(
    steps && steps > 0
      ? getLineStepsGeometry({ value, min, max, steps })
      : null
  )

  const circleSteps = $derived(
    steps && steps > 0 && (variant === "circle" || variant === "dashboard")
      ? getCircleStepsGeometry({
          value,
          min,
          max,
          size: numSize,
          thickness: numThickness,
          steps,
          gap,
        })
      : null
  )

  const infoText = $derived.by(() => {
    if (format) {
      return format(
        normalized.percentage !== null ? Math.round(normalized.percentage * 100) : null,
        normalized.value
      )
    }
    if (normalized.percentage !== null) {
      return `${Math.round(normalized.percentage * 100)}%`
    }
    return ""
  })
</script>

{#if steps && steps > 0}
  {#if variant === "circle" || variant === "dashboard"}
    <div
      {...rest}
      data-slot="progress"
      data-variant="circle-steps"
      class={cn("relative inline-flex items-center justify-center", classNames?.root, className)}
      style="width: {circleSteps?.size}px; height: {circleSteps?.size}px; {styles?.root ?? ''}"
    >
      <svg
        viewBox="0 0 {circleSteps?.size} {circleSteps?.size}"
        width={circleSteps?.size}
        height={circleSteps?.size}
        class="block shrink-0 -rotate-90"
      >
        {#each circleSteps?.steps ?? [] as step (step.index)}
          <circle
            cx={(circleSteps?.size ?? 0) / 2}
            cy={(circleSteps?.size ?? 0) / 2}
            r={circleSteps?.radius}
            fill="none"
            stroke={step.active ? (typeof color === "string" ? color : "var(--primary)") : (trackColor || "var(--progress-remaining)")}
            stroke-width={circleSteps?.thickness}
            stroke-dasharray={circleSteps?.stepDasharray}
            stroke-dashoffset={step.offset}
            stroke-linecap={linecap}
          />
        {/each}
      </svg>
      {#if shouldShowInfo}
        <div class={cn("absolute inset-0 flex items-center justify-center text-sm font-medium", classNames?.info)} style={styles?.info}>
          {#if isSuccess}
            <svg class="size-6 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m20 6-11 11-5-5" /></svg>
          {:else}
            {infoText}
          {/if}
        </div>
      {/if}
    </div>
  {:else}
    <div
      {...rest}
      data-slot="progress"
      data-variant="steps"
      class={cn(progressStepLineContainerClassName, classNames?.root, className)}
      style={styles?.root}
    >
      <div class={cn(progressStepLineTrackClassName, classNames?.track)} style={styles?.track}>
        {#each lineSteps?.steps ?? [] as step (step.index)}
          <span
            data-slot="progress-step"
            data-active={step.active ? "true" : undefined}
            class={cn(progressStepLineItemClassName, classNames?.step)}
            style="background: {step.active ? (getLinearProgressBackground(color) || 'var(--primary)') : (trackColor || 'var(--progress-remaining)')}; {styles?.step ?? ''}"
          ></span>
        {/each}
      </div>
      {#if shouldShowInfo}
        <span class={cn("text-sm font-medium", classNames?.info)} style={styles?.info}>
          {#if isSuccess && normalized.percentage !== null && normalized.percentage >= 1}
            <span class="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white">
              <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m20 6-11 11-5-5" /></svg>
            </span>
          {:else}
            {infoText}
          {/if}
        </span>
      {/if}
    </div>
  {/if}
{:else if variant === "line"}
  <PrimitiveProgress
    {value}
    {min}
    {max}
    variant="line"
    status={effectiveStatus}
    {color}
    {trackColor}
    class={cn("flex flex-col w-full", classNames?.root, className)}
    style={styles?.root}
  >
    {#if label || (shouldShowInfo && infoPlacement === "top")}
      <div class={cn(progressTopHeaderClassName, classNames?.label)}>
        {#if typeof label === "function"}
          {@render label()}
        {:else if typeof label === "string"}
          <ProgressLabel>{label}</ProgressLabel>
        {:else}
          <span></span>
        {/if}
        {#if shouldShowInfo && infoPlacement === "top"}
          <span class={cn("text-muted-foreground", classNames?.info)} style={styles?.info}>
            {infoText}
          </span>
        {/if}
      </div>
    {/if}
    <div class:relative={infoPlacement === "inside"} class="flex w-full items-center">
      <ProgressTrack class={cn("min-w-0 flex-1", classNames?.track)} style="height: {numThickness}px; {styles?.track ?? ''}">
        <ProgressRange {color} class={classNames?.range} style={styles?.range} />
      </ProgressTrack>
      {#if shouldShowInfo && infoPlacement === "outside"}
        <span class={cn("ms-2 shrink-0 text-sm font-medium", classNames?.info)} style={styles?.info}>
          {#if isSuccess && normalized.percentage !== null && normalized.percentage >= 1}
            <span class="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white">
          <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m20 6-11 11-5-5" /></svg>
            </span>
          {:else}
            {infoText}
          {/if}
        </span>
      {/if}
      {#if shouldShowInfo && infoPlacement === "inside"}
        <span class={cn("pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm font-medium text-white", classNames?.info)} style={styles?.info}>{infoText}</span>
      {/if}
    </div>
    {#if shouldShowInfo && infoPlacement === "bottom"}
      <div class="mt-1.5 flex w-full items-center justify-between text-sm">
        {#if label}<ProgressLabel>{label}</ProgressLabel>{:else}<span></span>{/if}
        <span class={cn("font-medium", classNames?.info)} style={styles?.info}>{infoText}</span>
      </div>
    {/if}
  </PrimitiveProgress>
{:else}
  <PrimitiveProgress
    {value}
    {min}
    {max}
    {variant}
    status={effectiveStatus}
    size={numSize}
    thickness={numThickness}
    {linecap}
    {trackLinecap}
    {color}
    {trackColor}
    {gapDegree}
    {gapPlacement}
    class={cn("relative inline-flex items-center justify-center", classNames?.root, className)}
    style={styles?.root}
  >
    <ProgressCircle gapDegree={variant === "dashboard" ? gapDegree : undefined} class={classNames?.track} style={styles?.track}>
      <ProgressCircleTrack gapDegree={variant === "dashboard" ? gapDegree : undefined} />
      <ProgressCircleRange {color} gapDegree={variant === "dashboard" ? gapDegree : undefined} class={classNames?.range} style={styles?.range} />
    </ProgressCircle>
    {#if shouldShowInfo}
      <div class={cn("absolute inset-0 flex items-center justify-center font-medium", classNames?.info)} style={styles?.info}>
        {#if isSuccess}
          <svg class="size-6 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m20 6-11 11-5-5" /></svg>
        {:else}
          {infoText}
        {/if}
      </div>
    {/if}
  </PrimitiveProgress>
{/if}
