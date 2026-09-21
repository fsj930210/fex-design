import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "eye-off-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./eye-off.html",
})
export class EyeOffIcon {}
