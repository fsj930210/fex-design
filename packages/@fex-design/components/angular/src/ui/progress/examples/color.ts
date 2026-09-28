import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProgressComponent } from "../progress.component";

@Component({
  selector: "progress-color-example",
  standalone: true,
  imports: [ProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./color.html",
})
export class ProgressColorExample {
}
