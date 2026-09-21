import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "chevron-right-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./chevron-right.html",
})
export class ChevronRightIcon {}
