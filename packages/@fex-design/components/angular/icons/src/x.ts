import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "x-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./x.html",
})
export class XIcon {}
