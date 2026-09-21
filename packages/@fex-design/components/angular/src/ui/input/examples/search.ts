import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { InputSearch } from '@fex-design/angular/ui/input'
import { SearchIcon } from '@fex-design/angular/icons/search'
@Component({
  selector: 'input-search-example',
  standalone: true,
  imports: [InputSearch, SearchIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.html',
})
export class SearchExample {
  protected readonly result = signal('尚未搜索')
  protected searched(event: { value: string; meta: { source: string } }) {
    this.result.set(`${event.meta.source}: ${event.value}`)
  }
}
