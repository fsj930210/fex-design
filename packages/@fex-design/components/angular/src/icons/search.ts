import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "search-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  templateUrl: "./search.html",
})
export class SearchIcon {}
