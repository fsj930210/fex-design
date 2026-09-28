import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProgressComponent } from "../progress.component";

@Component({
  selector: "progress-circle-example",
  standalone: true,
  imports: [ProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./circle.html",
})
export class ProgressCircleExample {
}
