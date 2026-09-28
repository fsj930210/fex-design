import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProgressComponent } from "../progress.component";

@Component({
  selector: "progress-size-example",
  standalone: true,
  imports: [ProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./size.html",
})
export class ProgressSizeExample {
}
