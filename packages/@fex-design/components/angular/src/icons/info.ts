import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "info-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./info.html",
})
export class InfoIcon {}
