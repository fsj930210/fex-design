import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "loading-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  templateUrl: "./loading.html",
})
export class LoadingIcon {}
