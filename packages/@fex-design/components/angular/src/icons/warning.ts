import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "warning-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  templateUrl: "./warning.html",
})
export class WarningIcon {}
