import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "chevrons-left-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  templateUrl: "./chevrons-left.html",
})
export class ChevronsLeftIcon {}
