import { Component } from "@angular/core"
import { ProgressComponent } from "../progress.component"

@Component({ selector: "progress-format-example", standalone: true, imports: [ProgressComponent], templateUrl: "./format.html" })
export class ProgressFormatExample {
  readonly formatStorage = (percent: number | null) => `${percent ?? 0} / 100 GB`
}
