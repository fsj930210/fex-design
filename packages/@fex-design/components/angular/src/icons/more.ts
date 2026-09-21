import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "more-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./more.html",
})
export class MoreIcon {}
