import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "chevron-left-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  templateUrl: "./chevron-left.html",
})
export class ChevronLeftIcon {}
