import { Component } from "@angular/core"
import { ProgressComponent } from "../progress.component"

@Component({
  selector: "progress-structured-example",
  standalone: true,
  imports: [ProgressComponent],
  templateUrl: "./structured.html",
})
export class ProgressStructuredExample {}
