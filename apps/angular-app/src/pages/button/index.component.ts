import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Button, ButtonGroup } from '@fex-design/angular/ui/button'
import Card from '@fex-design/angular/ui/card'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { ButtonPrimitiveDemo } from './primitive-demo.component'

@Component({
  selector: 'button-page',
  imports: [ButtonGroup, Button, ButtonPrimitiveDemo, Card, RouterLink, PlusIcon],
  host: { class: 'block' },
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  protected variants = [
    'default',
    'outline',
    'secondary',
    'ghost',
    'destructive',
    'link',
    'dashed',
  ] as const
  protected sizes = ['xs', 'sm', 'default', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const
  protected effects = [
    'expand-icon',
    'ring-hover',
    'shine-hover',
    'gooey-start',
    'gooey-end',
    'underline',
    'hover-underline',
    'press',
  ] as const
}
