import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProgressComponent } from "../progress.component";

@Component({
  selector: "progress-status-example",
  standalone: true,
  imports: [ProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./status.html",
})
export class ProgressStatusExample {
}
