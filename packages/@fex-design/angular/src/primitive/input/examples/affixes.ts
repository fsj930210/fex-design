import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  InputAddonAfter,
  InputAddonBefore,
  InputControl,
  InputGroup,
  InputPrefix,
  InputRoot,
  InputSuffix,
} from '@fex-design/angular/primitive/input'
import { SearchIcon } from '@fex-design/angular/icon/search'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'input-primitive-affixes-example',
  standalone: true,
  imports: [
    InputRoot,
    InputControl,
    InputGroup,
    InputPrefix,
    InputSuffix,
    InputAddonBefore,
    InputAddonAfter,
    SearchIcon,
    Button,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './affixes.html',
})
export class AffixesExample {}
