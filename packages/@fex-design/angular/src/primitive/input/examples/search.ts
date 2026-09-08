import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { inputActionClassName, inputSearchAddonClassName } from '@fex-design/styles/input'
import { buttonSpinnerClassName } from '@fex-design/styles/button'
import { LoadingIcon } from '@fex-design/angular/icon/loading'
import { SearchIcon } from '@fex-design/angular/icon/search'
import { Button } from '@fex-design/angular/primitive/button'
import {
  InputAddonAfter,
  InputAddonBefore,
  InputControl,
  InputGroup,
  InputPrefix,
  InputRoot,
} from '@fex-design/angular/primitive/input'
@Component({
  selector: 'input-primitive-search-example',
  standalone: true,
  imports: [
    InputRoot,
    InputControl,
    InputPrefix,
    InputGroup,
    InputAddonBefore,
    InputAddonAfter,
    Button,
    SearchIcon,
    LoadingIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.html',
})
export class SearchExample {
  readonly result = signal('尚未搜索')
  readonly actionClassName = inputActionClassName
  readonly addonClassName = inputSearchAddonClassName
  readonly spinnerClassName = buttonSpinnerClassName
  search(value: string, source: string) {
    this.result.set(`${source}: ${value}`)
  }
  enter(event: KeyboardEvent) {
    if (event.key === 'Enter') this.search((event.currentTarget as HTMLInputElement).value, 'enter')
  }
}
