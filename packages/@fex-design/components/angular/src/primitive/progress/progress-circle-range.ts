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
  selector: "circle[progressCircleRange], [progressCircleRange]",
  standalone: true,
  host: {
    "[class]": "hostClassName()",
    "data-slot": "progress-circle-range",
    "[attr.data-status]": "root.resolvedStatus()",
    "[attr.cx]": "geometry().center",
    "[attr.cy]": "geometry().center",
    "[attr.r]": "geometry().radius",
    fill: "none",
    "[attr.stroke]": "strokeColor()",
    "[attr.stroke-width]": "root.thickness() ?? (root.variant() === 'line' ? 8 : 4)",
    "[attr.stroke-dasharray]": "geometry().rangeDasharray",
    "[attr.stroke-dashoffset]": "geometry().dashOffset",
    "[attr.stroke-linecap]": "root.linecap()",
    pathLength: "100",
  },
})
export class ProgressCircleRange {
  readonly color = input<ProgressColor>()
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

  protected readonly strokeColor = computed(() => {
    const c = this.color() ?? this.root.color()
    return typeof c === "string" ? c : "currentColor"
  })
  protected readonly hostClassName = createHostClassName(progressCircleRangeClassName)
  constructor(readonly root: Progress) {}
}
