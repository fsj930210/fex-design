import { NgTemplateOutlet } from '@angular/common'
import {
  booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef,
  inject, input, type TemplateRef,
} from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import {
  ProgressCircle, ProgressCircleRange, ProgressCircleTrack,
  ProgressLabel, ProgressRange, ProgressTrack,
} from '@fex-design/angular/primitive/progress'
import { CheckIcon } from '@fex-design/angular/icons/check'
import {
  progressStepLineContainerClassName, progressStepLineItemClassName,
  progressStepLineTrackClassName, progressTopHeaderClassName,
} from '@fex-design/components-styles/progress'
import {
  getProgressRanges, getCircleStepsGeometry, getLineStepsGeometry, getLinearProgressBackground,
  getProgressGradientStops, getProgressStepColor, normalizeProgressValue, resolveProgressStatus,
} from '@fex-design/core/progress/progress'
import type {
  ProgressRangeItem, ProgressColor, ProgressGapPlacement, ProgressInfoPlacement, ProgressLinecap,
  ProgressSize, ProgressStatus, ProgressVariant,
} from '@fex-design/core/progress/types'
import { cn } from '@fex-design/utils'
import { mergeProgressStyle, type ProgressClassNames, type ProgressStyles } from './styles'
import { progressContext } from '../../primitive/progress/progress-context'

let nextGradientId = 0
function optionalBoolean(value: unknown): boolean | undefined {
  return value === undefined ? undefined : booleanAttribute(value)
}

@Component({
  selector: 'div[progress]',
  standalone: true,
  exportAs: 'progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, ProgressTrack, ProgressRange, ProgressLabel,
    ProgressCircle, ProgressCircleTrack, ProgressCircleRange, CheckIcon],
  providers: [{ provide: progressContext, useFactory: () => inject(Progress).context }],
  templateUrl: './progress.component.html',
  host: {
    '[class]': 'hostClassName()',
    '[style]': 'rootStyle()',
    'data-slot': 'progress',
    '[attr.data-variant]': "isLineSteps() ? 'steps' : isCircleSteps() ? 'circle-steps' : variant()",
    '[attr.data-status]': 'resolvedStatus()',
    '[attr.role]': "hasSteps() ? null : 'progressbar'",
    '[attr.aria-valuemin]': 'hasSteps() ? null : normalized().min',
    '[attr.aria-valuemax]': 'hasSteps() ? null : normalized().max',
    '[attr.aria-valuenow]': 'hasSteps() ? null : normalized().value',
    '[attr.aria-valuetext]': 'ariaValueText()',
  },
})
export class Progress {
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly value = input<number | null>(0)
  readonly min = input(0)
  readonly max = input(100)
  readonly variant = input<ProgressVariant>('line')
  readonly status = input<ProgressStatus>()
  readonly size = input<ProgressSize>()
  readonly thickness = input<number>()
  readonly ranges = input<readonly ProgressRangeItem[]>()
  readonly steps = input<number>()
  readonly gap = input(2)
  readonly color = input<ProgressColor>()
  readonly trackColor = input<string>()
  readonly linecap = input<ProgressLinecap>('round')
  readonly trackLinecap = input<ProgressLinecap>()
  readonly gapDegree = input(75)
  readonly gapPlacement = input<ProgressGapPlacement>('bottom')
  readonly showInfo = input(undefined, { transform: optionalBoolean })
  readonly showValue = input(undefined, { transform: optionalBoolean })
  readonly infoPlacement = input<ProgressInfoPlacement>('outside')
  readonly label = input<string>()
  readonly labelTemplate = input<TemplateRef<unknown>>()
  readonly infoTemplate = input<TemplateRef<{ percent: number | null; value: number | null }>>()
  readonly format = input<(percent: number | null, value: number | null) => string | number>()
  readonly success = input(false, { transform: booleanAttribute })
  readonly classNames = input<ProgressClassNames>()
  readonly styles = input<ProgressStyles>()
  protected readonly rangeLayout = computed(() => this.ranges() !== undefined && this.variant() === 'line' && !this.hasSteps() ? getProgressRanges(this.ranges()!, this.min(), this.max()) : null)
  protected readonly effectiveValue = computed(() => this.rangeLayout()?.value ?? this.value())
  readonly normalized = computed(() => normalizeProgressValue(this.effectiveValue(), this.min(), this.max()))
  readonly resolvedStatus = computed(() => this.success() ? 'success'
    : resolveProgressStatus(this.status(), this.effectiveValue(), this.min(), this.max()))
  readonly resolvedThickness = computed(() => this.thickness() ?? (
    typeof this.size() === 'number' && this.variant() === 'line' ? this.size() as number
    : this.size() === 'sm' ? 4 : this.size() === 'lg' ? 8 : this.variant() === 'line' ? 8 : 4))
  protected readonly numSize = computed(() => typeof this.size() === 'number' ? this.size() as number
    : this.size() === 'sm' ? (this.variant() === 'line' ? 4 : 32)
    : this.size() === 'lg' ? (this.variant() === 'line' ? 12 : 96)
    : this.variant() === 'line' ? 8 : 48)
  readonly context = { normalized: this.normalized, status: this.resolvedStatus,
    variant: this.variant, size: this.numSize, thickness: this.resolvedThickness }
  protected readonly shouldShowInfo = computed(() => this.showInfo() ?? this.showValue()
    ?? (this.variant() === 'line' || this.infoPlacement() === 'inside'))
  protected readonly hasSteps = computed(() => (this.steps() ?? 0) > 0)
  protected readonly isCircle = computed(() => this.variant() === 'circle' || this.variant() === 'dashboard')
  protected readonly isLineSteps = computed(() => this.hasSteps() && !this.isCircle())
  protected readonly isCircleSteps = computed(() => this.hasSteps() && this.isCircle())
  protected readonly lineSteps = computed(() => this.isLineSteps()
    ? getLineStepsGeometry({ value: this.value(), min: this.min(), max: this.max(), steps: this.steps() }) : null)
  protected readonly circleSteps = computed(() => this.isCircleSteps()
    ? getCircleStepsGeometry({ value: this.value(), min: this.min(), max: this.max(), steps: this.steps(),
      size: this.numSize(), thickness: this.resolvedThickness(), gap: this.gap() }) : null)
  protected readonly percent = computed(() => this.normalized().percentage === null ? null
    : Math.round(this.normalized().percentage! * 100))
  protected readonly ariaValueText = computed(() => this.hasSteps() || this.percent() === null ? null : `${this.percent()}%`)
  protected readonly infoContext = computed(() => ({ percent: this.percent(), value: this.normalized().value }))
  protected readonly infoText = computed(() => this.percent() === null ? '' : `${this.percent()}%`)
  protected readonly formattedInfo = computed(() => this.format()?.(this.percent(), this.normalized().value))
  protected readonly gradientId = `progress-gradient-${nextGradientId++}`
  protected readonly gradient = computed(() => getProgressGradientStops(this.color())?.map(([offset, color]) => ({
    offset: `${Number.parseFloat(offset)}%`, color,
  })))
  protected readonly circleStroke = computed(() => typeof this.color() === 'string' ? this.color() as string
    : this.gradient() ? `url(#${this.gradientId})` : undefined)
  protected readonly background = computed(() => getLinearProgressBackground(this.color()))
  protected readonly activeColor = computed(() => this.resolvedStatus() === 'success' ? 'var(--success)' : this.background() ?? 'var(--primary)')
  protected stepColor(index: number) {
    return this.resolvedStatus() === 'success' ? 'var(--success)' : getProgressStepColor(this.color(), index, this.steps()!)
  }
  protected readonly rootStyle = computed(() => this.isCircleSteps()
    ? mergeProgressStyle({ width: `${this.circleSteps()!.size}px`, height: `${this.circleSteps()!.size}px` }, this.styles()?.root)
    : this.styles()?.root ?? '')
  protected readonly trackStyle = computed(() => mergeProgressStyle({
    height: `${this.resolvedThickness()}px`,
    'background-color': this.trackColor(),
  }, this.styles()?.track))
  protected readonly rangeStyle = computed(() => mergeProgressStyle({
    background: this.background(),
  }, this.styles()?.range))
  protected stepStyle(active: boolean) {
    return mergeProgressStyle({ background: active ? this.activeColor() : this.trackColor() ?? 'var(--progress-remaining)' }, this.styles()?.step)
  }
  protected readonly hostClassName = createHostClassName(() => cn(
    this.isLineSteps() ? progressStepLineContainerClassName : this.isCircle() ? 'relative inline-flex items-center justify-center' : 'flex flex-col w-full',
    this.classNames()?.root,
  ))
  protected readonly stepTrackClass = computed(() => cn(progressStepLineTrackClassName, this.classNames()?.track))
  protected readonly stepClass = computed(() => cn(progressStepLineItemClassName, this.classNames()?.step))
  protected readonly headerClass = computed(() => cn(progressTopHeaderClassName, this.classNames()?.label))
  protected readonly trackClass = computed(() => cn('min-w-0 flex-1', this.classNames()?.track))
  protected readonly rangeClass = computed(() => this.classNames()?.range ?? '')
  protected rangeItemStyle(color: string | undefined) {
    return mergeProgressStyle({ 'border-radius': '0', background: color ?? 'var(--primary)' }, this.styles()?.range)
  }
  protected infoClass(base: string) { return cn(base, this.classNames()?.info) }
}
