import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  CascaderContent,
  CascaderPanel,
  CascaderRoot,
  CascaderTrigger,
} from '@fex-design/angular/primitive/cascader'
import { InfoIcon } from '@fex-design/angular/icon/info'
import Card from '@fex-design/angular/ui/card'
import { regionOptions } from './data'
export
@Component({
  selector: 'fex-cascader-custom-demo',
  standalone: true,
  imports: [Card, InfoIcon, CascaderRoot, CascaderTrigger, CascaderContent, CascaderPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-demo.component.html',
})
class CustomDemo {
  readonly options = regionOptions
}
