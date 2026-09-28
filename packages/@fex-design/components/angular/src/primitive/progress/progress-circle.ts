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

@Component({
  selector: "svg[progressCircle], [progressCircle]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClassName()",
    "data-slot": "progress-circle",
    "[attr.data-status]": "root.resolvedStatus()",
    "[attr.viewBox]": "viewBox()",
    "[attr.width]": "root.size()",
    "[attr.height]": "root.size()",
    "[style.transform]": "transform()",
  },
  template: "<ng-content />",
})
export class ProgressCircle {
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

  protected readonly viewBox = computed(() => "0 0 " + this.root.size() + " " + this.root.size())
  protected readonly transform = computed(() => "rotate(" + this.geometry().rotation + "deg)")
  protected readonly hostClassName = createHostClassName(progressCircleClassName)
  constructor(readonly root: Progress) {}
}

