import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  input,
} from "@angular/core"
import { createHostClassName } from "@fex-design/angular/signals/host-class"
import {
  progressCircleClassName,
  progressCircleRangeClassName,
  progressCircleTrackClassName,
  progressLabelClassName,
  progressLineClassName,
  progressLineRangeClassName,
  progressValueClassName,
} from "@fex-design/components-styles/progress"
import {
  getLinearProgressBackground,
  getProgressGeometry,
} from "@fex-design/core/progress/progress"
import type { ProgressColor } from "@fex-design/core/progress/types"
import { Progress } from "./progress"

@Directive({
  selector: "circle[progressCircleTrack], [progressCircleTrack]",
  standalone: true,
  host: {
    "[class]": "hostClassName()",
    "data-slot": "progress-circle-track",
    "[attr.cx]": "geometry().center",
    "[attr.cy]": "geometry().center",
    "[attr.r]": "geometry().radius",
    fill: "none",
    "[attr.stroke]": "root.trackColor() ?? 'currentColor'",
    "[attr.stroke-width]": "root.thickness() ?? (root.variant() === 'line' ? 8 : 4)",
    "[attr.stroke-dasharray]": "geometry().trackDasharray",
    "[attr.stroke-linecap]": "root.trackLinecap() ?? 'round'",
    pathLength: "100",
  },
})
export class ProgressCircleTrack {
  readonly gapDegree = input<number>()

  protected readonly geometry = computed(() => {
    const gap = this.gapDegree() ?? this.root.gapDegree()
    if (gap === this.root.gapDegree()) {
      return this.root.geometry()
    }
    return getProgressGeometry({
      value: this.root.value(),
      min: this.root.min(),
      max: this.root.max(),
      size: this.root.size(),
      thickness: (this.root.thickness() ?? (this.root.variant() === "line" ? 8 : 4)),
      variant: this.root.variant(),
      gapDegree: gap,
    })
  })

  protected readonly hostClassName = createHostClassName(progressCircleTrackClassName)
  constructor(readonly root: Progress) {}
}
