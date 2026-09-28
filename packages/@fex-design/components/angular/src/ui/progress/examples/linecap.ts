import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProgressComponent } from "../progress.component";

@Component({
  selector: "progress-linecap-example",
  standalone: true,
  imports: [ProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./linecap.html",
})
export class ProgressLinecapExample {
}
