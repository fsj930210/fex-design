import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "warning-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./warning.html",
})
export class WarningIcon {}
