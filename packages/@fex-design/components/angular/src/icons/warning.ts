import { ChangeDetectionStrategy, Component } from "@angular/core";
import { createHostClassName } from "@fex-design/angular/signals/host-class";

@Component({
  selector: "warning-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClassName()",
    "aria-hidden": "true",
  },
  templateUrl: "./warning.html",
})
export class WarningIcon {
  protected readonly hostClassName = createHostClassName("inline-flex items-center justify-center shrink-0 size-6");
}
