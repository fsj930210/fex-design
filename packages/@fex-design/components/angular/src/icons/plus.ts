import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "plus-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./plus.html",
})
export class PlusIcon {}
