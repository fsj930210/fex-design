import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProgressComponent } from "../progress.component";

@Component({
  selector: "progress-segmented-example",
  standalone: true,
  imports: [ProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./segmented.html",
})
export class ProgressSegmentedExample {
  readonly gradient = { from: "#1677ff", to: "#87d068" };
}
