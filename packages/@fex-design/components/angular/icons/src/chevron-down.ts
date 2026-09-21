import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "chevron-down-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./chevron-down.html",
})
export class ChevronDownIcon {}
