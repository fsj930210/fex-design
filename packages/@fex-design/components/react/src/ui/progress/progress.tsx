import {
  progressStepLineContainerClassName,
  progressStepLineItemClassName,
  progressStepLineTrackClassName,
  progressTopHeaderClassName,
} from '@fex-design/components-styles/progress'
import {
  getCircleStepsGeometry,
  getLineStepsGeometry,
  getLinearProgressBackground,
  normalizeProgressValue,
  resolveProgressStatus,
} from '@fex-design/core/progress/progress'
import type {
  ProgressColor,
  ProgressGapPlacement,
  ProgressInfoPlacement,
  ProgressLinecap,
  ProgressSize,
  ProgressStatus,
  ProgressVariant,
} from '@fex-design/core/progress/types'
import { CheckIcon } from '@fex-design/react/icons/check'
import {
  Progress as PrimitiveProgress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
} from '@fex-design/react/primitive/progress'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type CSSProperties, type ReactNode, type Ref, useId } from 'react'

export interface ProgressProps extends Omit<ComponentProps<'div'>, 'color'> {
  ref?: Ref<HTMLDivElement>
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
  label?: ReactNode
  format?: (percent: number | null, value: number | null) => ReactNode
  success?: boolean
  classNames?: Partial<Record<'root' | 'track' | 'range' | 'info' | 'label' | 'step', string>>
  styles?: Partial<Record<'root' | 'track' | 'range' | 'info' | 'label' | 'step', CSSProperties>>
}

function getStepStrokeColor(color: ProgressColor | undefined, index: number, steps: number) {
  if (!color) return 'var(--primary)'
  if (typeof color === 'string') return color
  if ('stops' in color) {
    const position = ((index + 1) / steps) * 100
    const stops = Object.entries(color.stops)
      .map(([key, value]) => [Number.parseFloat(key), value] as const)
      .sort((a, b) => a[0] - b[0])
    return (
      [...stops].reverse().find(([stop]) => position >= stop)?.[1] ??
      stops[0]?.[1] ??
      'var(--primary)'
    )
  }
  return index < steps / 2 ? color.from : color.to
}

export function Progress({
  ref,
  value = 0,
  min = 0,
  max = 100,
  variant = 'line',
  status,
  size,
  thickness,
  steps,
  gap = 2,
  color,
  trackColor,
  linecap = 'round',
  trackLinecap,
  gapDegree = 75,
  gapPlacement = 'bottom',
  showInfo,
  showValue,
  infoPlacement = 'outside',
  label,
  format,
  success,
  classNames,
  styles,
  className,
  style,
  ...props
}: ProgressProps) {
  const gradientId = useId().replace(/:/g, '')
  const normalized = normalizeProgressValue(value, min, max)
  const isComplete = normalized.percentage !== null && normalized.percentage >= 1
  const effectiveStatus: ProgressStatus = success
    ? 'success'
    : resolveProgressStatus(status, value, min, max)
  const isSuccess = effectiveStatus === 'success'
  const shouldShowInfo = showInfo ?? showValue ?? (variant === 'line' || infoPlacement === 'inside')

  // Resolve dimensions
  const numSize =
    typeof size === 'number'
      ? size
      : size === 'sm'
        ? variant === 'line'
          ? 4
          : 32
        : size === 'lg'
          ? variant === 'line'
            ? 12
            : 96
          : variant === 'line'
            ? 8
            : 48

  const numThickness =
    thickness ??
    (typeof size === 'number' && variant === 'line'
      ? size
      : size === 'sm'
        ? 4
        : size === 'lg'
          ? 8
          : variant === 'line'
            ? 8
            : 4)

  const rangeLinecapClassName =
    linecap === 'round' ? 'rounded-full' : linecap === 'square' ? 'rounded-[2px]' : 'rounded-none'
  const trackLinecapClassName =
    trackLinecap === 'butt'
      ? 'rounded-none'
      : trackLinecap === 'square'
        ? 'rounded-[2px]'
        : 'rounded-full'

  // Render info content (percentage or check icon)
  const renderInfoContent = () => {
    if (format)
      return format(
        normalized.percentage !== null ? Math.round(normalized.percentage * 100) : null,
        normalized.value,
      )
    if (isSuccess && variant !== 'line') {
      return <CheckIcon className="size-6 text-success" />
    }
    if (
      isSuccess &&
      variant === 'line' &&
      normalized.percentage !== null &&
      normalized.percentage >= 1
    ) {
      return (
        <span className="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white">
          <CheckIcon className="size-3" />
        </span>
      )
    }
    return normalized.percentage !== null ? `${Math.round(normalized.percentage * 100)}%` : ''
  }

  // 1. Step Line
  if (steps && steps > 0 && variant !== 'circle' && variant !== 'dashboard') {
    const lineSteps = getLineStepsGeometry({ value, min, max, steps })
    const activeColor = isSuccess
      ? 'var(--success)'
      : (getLinearProgressBackground(color) ?? 'var(--primary)')
    return (
      <div
        {...props}
        ref={ref}
        data-slot="progress"
        data-variant="steps"
        className={cn(progressStepLineContainerClassName, classNames?.root, className)}
        style={{ ...styles?.root, ...style }}
      >
        <div
          className={cn(progressStepLineTrackClassName, classNames?.track)}
          style={styles?.track}
        >
          {lineSteps.steps.map((step) => (
            <span
              key={step.index}
              data-slot="progress-step"
              data-active={step.active ? 'true' : undefined}
              className={cn(progressStepLineItemClassName, classNames?.step)}
              style={{
                background: step.active ? activeColor : (trackColor ?? 'var(--progress-remaining)'),
                ...styles?.step,
              }}
            />
          ))}
        </div>
        {shouldShowInfo && (
          <span className={cn('text-sm font-medium', classNames?.info)} style={styles?.info}>
            {renderInfoContent()}
          </span>
        )}
      </div>
    )
  }

  // 2. Step Circle
  if (steps && steps > 0 && (variant === 'circle' || variant === 'dashboard')) {
    const circleSteps = getCircleStepsGeometry({
      value,
      min,
      max,
      size: numSize,
      thickness: numThickness,
      steps,
      gap,
    })
    return (
      <div
        {...props}
        ref={ref}
        data-slot="progress"
        data-variant="circle-steps"
        className={cn(
          'relative inline-flex items-center justify-center',
          classNames?.root,
          className,
        )}
        style={{ width: circleSteps.size, height: circleSteps.size, ...styles?.root, ...style }}
      >
        <svg
          viewBox={`0 0 ${circleSteps.size} ${circleSteps.size}`}
          width={circleSteps.size}
          height={circleSteps.size}
          className="block shrink-0 -rotate-90"
        >
          {circleSteps.steps.map((step) => (
            <circle
              key={step.index}
              cx={circleSteps.size / 2}
              cy={circleSteps.size / 2}
              r={circleSteps.radius}
              fill="none"
              stroke={
                step.active
                  ? isSuccess
                    ? 'var(--success)'
                    : getStepStrokeColor(color, step.index, steps)
                  : (trackColor ?? 'var(--progress-remaining)')
              }
              strokeWidth={circleSteps.thickness}
              strokeDasharray={circleSteps.stepDasharray}
              strokeDashoffset={step.offset}
              strokeLinecap={linecap}
            />
          ))}
        </svg>
        {shouldShowInfo && (
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center text-sm font-medium',
              classNames?.info,
            )}
            style={styles?.info}
          >
            {renderInfoContent()}
          </div>
        )}
      </div>
    )
  }

  // 3. Standard Circle / Dashboard
  if (variant === 'circle' || variant === 'dashboard') {
    const circleGradient = typeof color === 'object' ? color : null
    return (
      <PrimitiveProgress
        {...props}
        ref={ref}
        value={value}
        min={min}
        max={max}
        variant={variant}
        status={effectiveStatus}
        size={numSize}
        thickness={numThickness}
        className={cn(
          'relative inline-flex items-center justify-center',
          classNames?.root,
          className,
        )}
        style={{ ...styles?.root, ...style }}
      >
        <ProgressCircle
          gapDegree={variant === 'dashboard' ? gapDegree : undefined}
          rotation={variant === 'dashboard' && gapPlacement === 'top' ? 315 : undefined}
          className={classNames?.track}
          style={styles?.track}
        >
          {circleGradient && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                {'stops' in circleGradient ? (
                  Object.entries(circleGradient.stops)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([offset, stopColor]) => (
                      <stop key={offset} offset={`${offset}%`} stopColor={stopColor} />
                    ))
                ) : (
                  <>
                    <stop offset="0%" stopColor={circleGradient.from} />
                    <stop offset="100%" stopColor={circleGradient.to} />
                  </>
                )}
              </linearGradient>
            </defs>
          )}
          <ProgressCircleTrack
            gapDegree={variant === 'dashboard' ? gapDegree : undefined}
            trackLinecap={trackLinecap}
          />
          <ProgressCircleRange
            stroke={
              typeof color === 'string' ? color : circleGradient ? `url(#${gradientId})` : undefined
            }
            linecap={linecap}
            gapDegree={variant === 'dashboard' ? gapDegree : undefined}
            className={classNames?.range}
            style={styles?.range}
          />
        </ProgressCircle>
        {shouldShowInfo && (
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center font-medium',
              classNames?.info,
            )}
            style={styles?.info}
          >
            {renderInfoContent()}
          </div>
        )}
      </PrimitiveProgress>
    )
  }

  // 4. Standard Line
  return (
    <PrimitiveProgress
      {...props}
      ref={ref}
      value={value}
      min={min}
      max={max}
      variant="line"
      status={effectiveStatus}
      thickness={numThickness}
      className={cn('flex flex-col w-full', classNames?.root, className)}
      style={{ ...styles?.root, ...style }}
    >
      {infoPlacement !== 'bottom' && (label || (shouldShowInfo && infoPlacement === 'top')) && (
        <div className={cn(progressTopHeaderClassName, classNames?.label)}>
          {label ? <ProgressLabel>{label}</ProgressLabel> : <span />}
          {shouldShowInfo && infoPlacement === 'top' && (
            <span className={cn('text-muted-foreground', classNames?.info)} style={styles?.info}>
              {renderInfoContent()}
            </span>
          )}
        </div>
      )}
      <div className={cn('flex w-full items-center', infoPlacement === 'inside' && 'relative')}>
        <ProgressTrack
          className={cn('min-w-0 flex-1', trackLinecapClassName, classNames?.track)}
          style={{
            height: numThickness,
            borderRadius: trackLinecap === 'butt' ? 0 : trackLinecap === 'square' ? 2 : 9999,
            ...(trackColor ? { backgroundColor: trackColor } : {}),
            ...styles?.track,
          }}
        >
          <ProgressRange
            className={cn(rangeLinecapClassName, classNames?.range)}
            style={{
              borderRadius: linecap === 'round' ? 9999 : linecap === 'square' ? 2 : 0,
              boxShadow:
                linecap === 'square' ? `${numThickness / 2}px 0 0 currentColor` : undefined,
              ...(getLinearProgressBackground(color)
                ? { background: getLinearProgressBackground(color) }
                : {}),
              ...styles?.range,
            }}
          />
        </ProgressTrack>
        {shouldShowInfo && infoPlacement === 'outside' && (
          <span
            className={cn('ms-2 shrink-0 text-sm font-medium', classNames?.info)}
            style={styles?.info}
          >
            {renderInfoContent()}
          </span>
        )}
        {shouldShowInfo && infoPlacement === 'inside' && (
          <span
            className={cn(
              'pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm font-medium text-white',
              classNames?.info,
            )}
            style={styles?.info}
          >
            {renderInfoContent()}
          </span>
        )}
      </div>
      {shouldShowInfo && infoPlacement === 'bottom' && (
        <div className="mt-1.5 flex w-full items-center justify-between text-sm">
          {label ? <ProgressLabel className={classNames?.label}>{label}</ProgressLabel> : <span />}
          <span className={cn('font-medium', classNames?.info)} style={styles?.info}>
            {renderInfoContent()}
          </span>
        </div>
      )}
    </PrimitiveProgress>
  )
}

export type {
  ProgressColor,
  ProgressGapPlacement,
  ProgressInfoPlacement,
  ProgressLinecap,
  ProgressSize,
  ProgressStatus,
  ProgressVariant,
} from '@fex-design/core/progress/types'
