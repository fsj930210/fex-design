import { progressStepLineContainerClassName, progressStepLineItemClassName, progressStepLineTrackClassName } from '@fex-design/components-styles/progress'
import { getCircleStepsGeometry, getLineStepsGeometry, getLinearProgressBackground, getProgressStepColor, normalizeProgressValue } from '@fex-design/core/progress/progress'
import { cn } from '@fex-design/utils'
import { ProgressInfo } from './progress-info'
import type { ProgressProps } from './types'

type ProgressStepsProps = ProgressProps & { steps: number; numSize: number; numThickness: number; shouldShowInfo: boolean }

export function ProgressSteps({ ref, value = 0, min = 0, max = 100, variant = 'line', status: effectiveStatus = 'active', numSize, numThickness, steps, gap = 2, color, trackColor, linecap = 'round', shouldShowInfo, format, classNames, styles, className, style, ...props }: ProgressStepsProps) {
  const normalized = normalizeProgressValue(value, min, max)
  const isSuccess = effectiveStatus === 'success'
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
            <ProgressInfo normalized={normalized} status={effectiveStatus} variant={variant} format={format} />
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
                    : getProgressStepColor(color, step.index, steps)
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
            <ProgressInfo normalized={normalized} status={effectiveStatus} variant={variant} format={format} />
          </div>
        )}
      </div>
    )
  }

  return null
}
