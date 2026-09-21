import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "chevron-up-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  templateUrl: "./chevron-up.html",
})
export class ChevronUpIcon {}
