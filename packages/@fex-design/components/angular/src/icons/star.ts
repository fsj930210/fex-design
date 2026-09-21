import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "star-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./star.html",
})
export class StarIcon {}
