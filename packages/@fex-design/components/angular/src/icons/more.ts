import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "more-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  templateUrl: "./more.html",
})
export class MoreIcon {}
