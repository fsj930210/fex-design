import { ChangeDetectionStrategy, Component } from "@angular/core";
import { createHostClassName } from "@fex-design/angular/signals/host-class";

@Component({
  selector: "chevrons-right-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClassName()",
    "aria-hidden": "true",
  },
  templateUrl: "./chevrons-right.html",
})
export class ChevronsRightIcon {
  protected readonly hostClassName = createHostClassName("inline-flex items-center justify-center shrink-0 size-6");
}
