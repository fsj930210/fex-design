import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "error-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./error.html",
})
export class ErrorIcon {}
