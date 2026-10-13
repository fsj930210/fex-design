import { ChangeDetectionStrategy, Component } from "@angular/core";
import { createHostClassName } from "@fex-design/angular/signals/host-class";

@Component({
  selector: "x-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClassName()",
    "aria-hidden": "true",
  },
  templateUrl: "./x.html",
})
export class XIcon {
  protected readonly hostClassName = createHostClassName("inline-flex items-center justify-center shrink-0 size-6");
}
