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
  selector: "div[progressRange], [progressRange]",
  standalone: true,
  host: {
    "[class]": "hostClassName()",
    "data-slot": "progress-range",
    "[attr.data-status]": "root.resolvedStatus()",
    "[style.width]": "width()",
    "[style.left]": "offsetPercent()",
    "[style.background]": "background()",
  },
})
export class ProgressRange {
  readonly value = input<number>()
  readonly offset = input<number>()
  readonly color = input<ProgressColor>()

  protected readonly percentage = computed(() => {
    const val = this.value()
    if (val !== undefined) {
      return Math.min(1, Math.max(0, (val - this.root.min()) / (this.root.max() - this.root.min())))
    }
    return this.root.normalized().percentage
  })

  protected readonly width = computed(() =>
    this.percentage() !== null ? (this.percentage()! * 100) + "%" : null,
  )

  protected readonly offsetPercent = computed(() =>
    this.offset() !== undefined ? this.offset() + "%" : null,
  )

  protected readonly background = computed(() =>
    getLinearProgressBackground(this.color() ?? this.root.color()),
  )

  protected readonly hostClassName = createHostClassName(progressLineRangeClassName)
  constructor(readonly root: Progress) {}
}

