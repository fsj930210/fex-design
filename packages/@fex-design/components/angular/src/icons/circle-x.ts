import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "circle-x-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./circle-x.html",
})
export class CircleXIcon {}
