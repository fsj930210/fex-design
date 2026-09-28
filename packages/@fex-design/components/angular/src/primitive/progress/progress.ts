import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core"
import { createHostClassName } from "@fex-design/angular/signals/host-class"
import { progressRootClassName } from "@fex-design/components-styles/progress"
import {
  getProgressGeometry,
  normalizeProgressValue,
  resolveProgressStatus,
} from "@fex-design/core/progress/progress"
import type {
  ProgressColor,
  ProgressLinecap,
  ProgressStatus,
  ProgressVariant,
} from "@fex-design/core/progress/types"

@Component({
  selector: "div[progressRoot], [progressRoot]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./progress.html",
  host: {
    "[class]": "hostClassName()",
    role: "progressbar",
    "data-slot": "progress",
    "[attr.data-variant]": "variant()",
    "[attr.data-status]": "resolvedStatus()",
    "[attr.aria-valuemin]": "normalized().min",
    "[attr.aria-valuemax]": "normalized().max",
    "[attr.aria-valuenow]": "normalized().value",
    "[attr.aria-valuetext]": "ariaValueText()",
  },
})
export class Progress {
  readonly value = input<number | null>(0)
  readonly min = input(0)
  readonly max = input(100)
  readonly variant = input<ProgressVariant>("line")
  readonly status = input<ProgressStatus>()
  readonly size = input(48)
  readonly thickness = input<number>()
  readonly linecap = input<ProgressLinecap>("round")
  readonly trackLinecap = input<ProgressLinecap>()
  readonly color = input<ProgressColor>()
  readonly trackColor = input<string>()
  readonly gapDegree = input(75)
  readonly gapPlacement = input<"top" | "bottom" | "start" | "end">("bottom")

  readonly normalized = computed(() =>
    normalizeProgressValue(this.value(), this.min(), this.max()),
  )

  readonly resolvedStatus = computed(() =>
    resolveProgressStatus(this.status(), this.value(), this.min(), this.max()),
  )

  readonly ariaValueText = computed(() =>
    this.normalized().percentage !== null
      ? Math.round(this.normalized().percentage! * 100) + "%"
      : undefined,
  )

  readonly geometry = computed(() =>
    getProgressGeometry({
      value: this.value(),
      min: this.min(),
      max: this.max(),
      size: this.size(),
      thickness: this.thickness() ?? (this.variant() === "line" ? 8 : 4),
      variant: this.variant(),
      gapDegree: this.gapDegree(),
    }),
  )

  protected readonly hostClassName = createHostClassName(
    () => progressRootClassName + (this.variant() === "line" ? " w-full" : ""),
  )
}

export { ProgressCircle } from "./progress-circle"
export { ProgressCircleRange } from "./progress-circle-range"
export { ProgressCircleTrack } from "./progress-circle-track"
export { ProgressLabel } from "./progress-label"
export { ProgressRange } from "./progress-range"
export { ProgressTrack } from "./progress-track"
export { ProgressValue } from "./progress-value"
export type {
  ProgressColor,
  ProgressLinecap,
  ProgressStatus,
  ProgressVariant,
} from "@fex-design/core/progress/types"
