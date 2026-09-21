import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
import { SearchIcon } from '@fex-design/angular/icons/search'
@Component({
  selector: 'input-affixes-example',
  standalone: true,
  imports: [Input, Button, SearchIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './affixes.html',
})
export class AffixesExample {}
