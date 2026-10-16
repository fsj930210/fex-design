import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { createHostClassName } from "@fex-design/angular/signals/host-class";

@Component({
  selector: "clock-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClassName()",
    "aria-hidden": "true",
  },
  templateUrl: "./clock.html",
})
export class ClockIcon {
  readonly class = input<string>();
  protected readonly hostClassName = createHostClassName("inline-flex items-center justify-center shrink-0 size-6", () => this.class());
}
