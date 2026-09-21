import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "chevron-up-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./chevron-up.html",
})
export class ChevronUpIcon {}
