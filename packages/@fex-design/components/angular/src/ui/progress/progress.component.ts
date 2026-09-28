import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core"
import { CheckIcon } from "@fex-design/angular/icons/check"
import {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
} from "@fex-design/angular/primitive/progress"
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
import { cn } from "@fex-design/utils"

@Component({
  selector: "div[progress], [progress]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Progress,
    ProgressTrack,
    ProgressRange,
    ProgressLabel,
    ProgressCircle,
    ProgressCircleTrack,
    ProgressCircleRange,
    CheckIcon,
  ],
  templateUrl: "./progress.component.html",
})
export class ProgressComponent {
  readonly value = input<number | null>(0)
  readonly min = input(0)
  readonly max = input(100)
  readonly variant = input<ProgressVariant>("line")
  readonly status = input<ProgressStatus>()
  readonly size = input<ProgressSize>()
  readonly thickness = input<number>()
  readonly steps = input<number>()
  readonly gap = input<number>(2)
  readonly color = input<ProgressColor>()
  readonly trackColor = input<string>()
  readonly linecap = input<ProgressLinecap>("round")
  readonly trackLinecap = input<ProgressLinecap>()
  readonly gapDegree = input<number>(75)
  readonly gapPlacement = input<ProgressGapPlacement>("bottom")
  readonly primitiveGapPlacement = computed<"top" | "bottom" | "start" | "end">(() => {
    const placement = this.gapPlacement()
    return placement === "left" ? "start" : placement === "right" ? "end" : placement
  })
  readonly showInfo = input<boolean>()
  readonly showValue = input(false, { transform: booleanAttribute })
  readonly infoPlacement = input<ProgressInfoPlacement>("outside")
  readonly label = input<string>()
  readonly format = input<(percent: number | null, value: number | null) => string>()
  readonly success = input(false, { transform: booleanAttribute })
  readonly classNames = input<Record<string, string>>()
  readonly styles = input<Record<string, string>>()
  readonly class = input<string>("")

  readonly normalized = computed(() =>
    normalizeProgressValue(this.value(), this.min(), this.max())
  )

  readonly isComplete = computed(() =>
    this.normalized().percentage !== null && this.normalized().percentage! >= 1
  )

  readonly isSuccess = computed(() =>
    this.success() || this.status() === "success" || (this.isComplete() && !this.status())
  )

  readonly effectiveStatus = computed<ProgressStatus>(() =>
    this.success() ? "success" : resolveProgressStatus(this.status(), this.value(), this.min(), this.max())
  )

  readonly shouldShowInfo = computed(() =>
    this.showInfo() ?? (this.showValue() || this.variant() === "line" || this.infoPlacement() === "inside")
  )

  readonly numSize = computed(() => {
    const s = this.size()
    if (typeof s === "number") return s
    if (s === "sm") return this.variant() === "line" ? 4 : 32
    if (s === "lg") return this.variant() === "line" ? 12 : 96
    return this.variant() === "line" ? 8 : 48
  })

  readonly numThickness = computed(() => {
    const t = this.thickness()
    if (t !== undefined) return t
    const s = this.size()
    if (typeof s === "number" && this.variant() === "line") return s
    if (s === "sm") return 4
    if (s === "lg") return 8
    return this.variant() === "line" ? 8 : 4
  })

  readonly isLineSteps = computed(() =>
    (this.steps() ?? 0) > 0 && this.variant() !== "circle" && this.variant() !== "dashboard"
  )

  readonly isCircleSteps = computed(() =>
    (this.steps() ?? 0) > 0 && (this.variant() === "circle" || this.variant() === "dashboard")
  )

  readonly lineSteps = computed(() =>
    this.isLineSteps()
      ? getLineStepsGeometry({
          value: this.value(),
          min: this.min(),
          max: this.max(),
          steps: this.steps() ?? 10,
        })
      : null
  )

  readonly circleSteps = computed(() =>
    this.isCircleSteps()
      ? getCircleStepsGeometry({
          value: this.value(),
          min: this.min(),
          max: this.max(),
          size: this.numSize(),
          thickness: this.numThickness(),
          steps: this.steps() ?? 10,
          gap: this.gap() ?? 2,
        })
      : null
  )

  readonly infoText = computed(() => {
    const fmt = this.format()
    const norm = this.normalized()
    if (fmt) {
      return fmt(
        norm.percentage !== null ? Math.round(norm.percentage * 100) : null,
        norm.value
      )
    }
    return norm.percentage !== null ? `${Math.round(norm.percentage * 100)}%` : ""
  })

  readonly stepActiveColor = computed(() =>
    getLinearProgressBackground(this.color())
  )

  readonly circleActiveColor = computed(() =>
    typeof this.color() === "string" ? (this.color() as string) : null
  )

  readonly stepLineContainerClass = computed(() =>
    cn(progressStepLineContainerClassName, this.classNames()?.["root"], this.class())
  )

  readonly stepLineTrackClass = computed(() =>
    cn(progressStepLineTrackClassName, this.classNames()?.["track"])
  )

  readonly stepLineItemClass = computed(() =>
    cn(progressStepLineItemClassName, this.classNames()?.["step"])
  )

  readonly infoClass = computed(() =>
    cn("text-sm font-medium", this.classNames()?.["info"])
  )

  readonly circleStepsContainerClass = computed(() =>
    cn("relative inline-flex items-center justify-center", this.classNames()?.["root"], this.class())
  )

  readonly circleInfoClass = computed(() =>
    cn("absolute inset-0 flex items-center justify-center text-sm font-medium", this.classNames()?.["info"])
  )

  readonly lineRootClass = computed(() =>
    cn("flex flex-col w-full", this.classNames()?.["root"], this.class())
  )

  readonly topHeaderClass = computed(() =>
    cn(progressTopHeaderClassName, this.classNames()?.["label"])
  )

  readonly topInfoClass = computed(() =>
    cn("text-muted-foreground", this.classNames()?.["info"])
  )

  readonly outsideInfoClass = computed(() =>
    cn("ms-2 shrink-0 text-sm font-medium", this.classNames()?.["info"])
  )

  readonly circleRootClass = computed(() =>
    cn("relative inline-flex items-center justify-center", this.classNames()?.["root"], this.class())
  )

  readonly circleCenterInfoClass = computed(() =>
    cn("absolute inset-0 flex items-center justify-center font-medium", this.classNames()?.["info"])
  )
}

