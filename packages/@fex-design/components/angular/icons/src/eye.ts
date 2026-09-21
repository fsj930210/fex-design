import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "eye-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./eye.html",
})
export class EyeIcon {}
