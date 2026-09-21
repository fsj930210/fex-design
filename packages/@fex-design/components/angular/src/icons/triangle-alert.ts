import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "triangle-alert-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./triangle-alert.html",
})
export class TriangleAlertIcon {}
