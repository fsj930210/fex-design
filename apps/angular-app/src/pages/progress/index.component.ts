import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { MinusIcon } from "@fex-design/angular/icon/minus";
import { PlusIcon } from "@fex-design/angular/icon/plus";
import { Progress } from "@fex-design/angular/ui/progress";
import { Button } from "@fex-design/angular/ui/button";
import { Card } from "@fex-design/angular/ui/card";

@Component({
  selector: "progress-page",
  standalone: true,
  imports: [Card, Progress, Button, MinusIcon, PlusIcon],
  host: { class: "block" },
  templateUrl: "./index.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {
  protected readonly gradient = { from: "#1677ff", to: "#87d068" } as const;
  protected readonly segmentGradient = {
    stops: {
      "0%": "#1677ff",
      "50%": "#1677ff",
      "50.01%": "#52c41a",
      "100%": "#52c41a",
    },
  } as const;
  protected readonly value = signal(50);

  protected decrease() {
    this.value.update((v) => Math.max(0, v - 10));
  }

  protected increase() {
    this.value.update((v) => Math.min(100, v + 10));
  }
}
