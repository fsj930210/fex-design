import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { createHostClassName } from "@fex-design/angular/signals/host-class";

@Component({
  selector: "chevron-right-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClassName()",
    "aria-hidden": "true",
  },
  templateUrl: "./chevron-right.html",
})
export class ChevronRightIcon {
  readonly class = input<string>();
  protected readonly hostClassName = createHostClassName("inline-flex items-center justify-center shrink-0 size-6", () => this.class());
}
