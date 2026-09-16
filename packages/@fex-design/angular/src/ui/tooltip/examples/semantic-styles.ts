import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tooltip, TooltipTrigger } from '@fex-design/angular/ui/tooltip'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'tooltip-ui-semantic-styles-example',
  standalone: true,
  imports: [Tooltip, TooltipTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SemanticStylesExample {
  readonly classNames = { root: 'rounded-2xl font-semibold shadow-xl', arrow: 'rounded-[3px]' }
  readonly styles = {
    root: {
      backgroundColor: '#7c3aed',
      borderRadius: '16px',
      color: '#fff',
      fontSize: '16px',
      lineHeight: '24px',
      maxWidth: '260px',
      padding: '12px 20px',
    },
    arrow: { backgroundColor: '#7c3aed', width: '12px', height: '12px' },
  }
}
