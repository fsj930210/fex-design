import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "trash-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  templateUrl: "./trash.html",
})
export class TrashIcon {}
