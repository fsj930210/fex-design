import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "calendar-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./calendar.html",
})
export class CalendarIcon {}
