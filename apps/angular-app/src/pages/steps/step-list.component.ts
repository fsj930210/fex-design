import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Step, StepContent, StepIndicator } from '@fex-design/angular/primitive/steps'
export
@Component({
  selector: 'fex-steps-step-list',
  standalone: true,
  imports: [Step, StepContent, StepIndicator],
  host: { class: 'contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './step-list.component.html',
})
class StepListComponent {
  error = input(false)
  disabled = input(false)
}
