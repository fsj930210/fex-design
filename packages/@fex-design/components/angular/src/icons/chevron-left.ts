import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "chevron-left-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./chevron-left.html",
})
export class ChevronLeftIcon {}
