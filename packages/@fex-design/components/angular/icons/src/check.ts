import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "check-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./check.html",
})
export class CheckIcon {}
