import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "chevrons-right-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  templateUrl: "./chevrons-right.html",
})
export class ChevronsRightIcon {}
