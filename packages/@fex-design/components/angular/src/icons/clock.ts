import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "clock-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./clock.html",
})
export class ClockIcon {}
