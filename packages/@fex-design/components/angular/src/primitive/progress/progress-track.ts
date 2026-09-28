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
  selector: "div[progressTrack], [progressTrack]",
  standalone: true,
  host: {
    "[class]": "hostClassName()",
    "data-slot": "progress-track",
    "[attr.data-status]": "root.resolvedStatus()",
    "[style.background-color]": "root.trackColor() || null",
  },
})
export class ProgressTrack {
  protected readonly hostClassName = createHostClassName(progressLineClassName)
  constructor(readonly root: Progress) {}
}

