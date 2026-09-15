import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BasicExample } from '../../../../../packages/@fex-design/angular/src/ui/popover/examples/basic'
import { TriggersExample } from '../../../../../packages/@fex-design/angular/src/ui/popover/examples/triggers'
import { PlacementExample } from '../../../../../packages/@fex-design/angular/src/ui/popover/examples/placement'
import { ArrowExample } from '../../../../../packages/@fex-design/angular/src/ui/popover/examples/arrow'
import { ContainerExample } from '../../../../../packages/@fex-design/angular/src/ui/popover/examples/container'
import { ControlledExample } from '../../../../../packages/@fex-design/angular/src/ui/popover/examples/controlled'
import { OffsetsExample } from '../../../../../packages/@fex-design/angular/src/ui/popover/examples/offsets'
import { SemanticStylesExample } from '../../../../../packages/@fex-design/angular/src/ui/popover/examples/semantic-styles'

@Component({
  selector: 'popover-page',
  standalone: true,
  imports: [
    BasicExample,
    TriggersExample,
    PlacementExample,
    ArrowExample,
    ContainerExample,
    ControlledExample,
    OffsetsExample,
    SemanticStylesExample,
  ],
  host: { class: 'block' },
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {}
