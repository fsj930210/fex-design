import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { ProgressComponent } from "../progress.component";

@Component({
  selector: "progress-dynamic-example",
  standalone: true,
  imports: [ProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./dynamic.html",
})
export class ProgressDynamicExample {
  readonly value = signal(30);
  increase() { this.value.update(v => Math.min(100, v + 10)); }
  decrease() { this.value.update(v => Math.max(0, v - 10)); }
}
