import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/angular/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/angular/primitive/input'
@Component({
  selector: 'input-number-primitive-affixes-example',
  standalone: true,
  imports: [
    InputNumberRoot,
    InputNumberControl,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
    InputNumberClear,
    InputPrefix,
    InputSuffix,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './affixes.html',
})
export class AffixesExample {}
