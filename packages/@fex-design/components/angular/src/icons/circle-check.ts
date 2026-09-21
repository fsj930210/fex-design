import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "circle-check-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./circle-check.html",
})
export class CircleCheckIcon {}
