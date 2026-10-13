import { ChangeDetectionStrategy, Component } from "@angular/core";
import { createHostClassName } from "@fex-design/angular/signals/host-class";

@Component({
  selector: "chevrons-left-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClassName()",
    "aria-hidden": "true",
  },
  templateUrl: "./chevrons-left.html",
})
export class ChevronsLeftIcon {
  protected readonly hostClassName = createHostClassName("inline-flex items-center justify-center shrink-0 size-6");
}
