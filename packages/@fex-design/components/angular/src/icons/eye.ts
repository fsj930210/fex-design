import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "eye-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  templateUrl: "./eye.html",
})
export class EyeIcon {}
