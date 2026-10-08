import { progressTopHeaderClassName } from '@fex-design/components-styles/progress'
import { getProgressRanges, getLinearProgressBackground, normalizeProgressValue, resolveProgressStatus } from '@fex-design/core/progress/progress'
import type { ProgressStatus } from '@fex-design/core/progress/types'
import { Progress as PrimitiveProgress, ProgressCircle, ProgressCircleRange, ProgressCircleTrack, ProgressLabel, ProgressRange, ProgressTrack } from '@fex-design/react/primitive/progress'
import { cn } from '@fex-design/utils'
import { useId } from 'react'
import { ProgressInfo } from './progress-info'
import { ProgressSteps } from './progress-steps'
import type { ProgressProps } from './types'
export type { ProgressProps } from './types'

export function Progress({
  ref,
  value = 0,
  min = 0,
  max = 100,
  variant = 'line',
  status,
  size,
  thickness,
  ranges,
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
  const rangeLayout = ranges !== undefined && variant === 'line' && !(steps && steps > 0) ? getProgressRanges(ranges, min, max) : null
  const effectiveValue = rangeLayout?.value ?? value
  const normalized = normalizeProgressValue(effectiveValue, min, max)
  const effectiveStatus: ProgressStatus = success
    ? 'success'
    : resolveProgressStatus(status, effectiveValue, min, max)
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

  if (steps && steps > 0) {
    return <ProgressSteps {...props} ref={ref} value={effectiveValue} min={min} max={max} variant={variant}
      status={effectiveStatus} steps={steps} numSize={numSize} numThickness={numThickness} gap={gap}
      color={color} trackColor={trackColor} linecap={linecap} shouldShowInfo={shouldShowInfo} format={format}
      classNames={classNames} styles={styles} className={className} style={style} />
  }

  // 3. Standard Circle / Dashboard
  if (variant === 'circle' || variant === 'dashboard') {
    const circleGradient = typeof color === 'object' ? color : null
    return (
      <PrimitiveProgress
        {...props}
        ref={ref}
        value={effectiveValue}
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
            <ProgressInfo normalized={normalized} status={effectiveStatus} variant={variant} format={format} />
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
      value={effectiveValue}
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
              <ProgressInfo normalized={normalized} status={effectiveStatus} variant={variant} format={format} />
            </span>
          )}
        </div>
      )}
      <div className={cn('flex w-full items-center', infoPlacement === 'inside' && 'relative')}>
        <ProgressTrack
          className={cn('min-w-0 flex-1', classNames?.track)}
          style={{
            height: numThickness,
            ...(trackColor ? { backgroundColor: trackColor } : {}),
            ...styles?.track,
          }}
        >
          {rangeLayout ? rangeLayout.ranges.map((range) => (
            <ProgressRange key={range.index} value={range.value} offset={range.offset}
              className={classNames?.range}
              style={{ borderRadius: 0, background: range.color ?? 'var(--primary)', ...styles?.range }} />
          )) : (
            <ProgressRange className={classNames?.range}
              style={{
                ...(getLinearProgressBackground(color) ? { background: getLinearProgressBackground(color) } : {}),
                ...styles?.range,
              }} />
          )}
        </ProgressTrack>
        {shouldShowInfo && infoPlacement === 'outside' && (
          <span
            className={cn('ms-2 shrink-0 text-sm font-medium', classNames?.info)}
            style={styles?.info}
          >
            <ProgressInfo normalized={normalized} status={effectiveStatus} variant={variant} format={format} />
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
            <ProgressInfo normalized={normalized} status={effectiveStatus} variant={variant} format={format} />
          </span>
        )}
      </div>
      {shouldShowInfo && infoPlacement === 'bottom' && (
        <div className="mt-1.5 flex w-full items-center justify-between text-sm">
          {label ? <ProgressLabel className={classNames?.label}>{label}</ProgressLabel> : <span />}
          <span className={cn('font-medium', classNames?.info)} style={styles?.info}>
            <ProgressInfo normalized={normalized} status={effectiveStatus} variant={variant} format={format} />
          </span>
        </div>
      )}
    </PrimitiveProgress>
  )
}

export type {
  ProgressRangeItem, ProgressColor,
  ProgressGapPlacement,
  ProgressInfoPlacement,
  ProgressLinecap,
  ProgressSize,
  ProgressStatus,
  ProgressVariant,
} from '@fex-design/core/progress/types'
