import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SyncSearch } from './sync-search'
import { TreeAsyncSearchExample } from './async-search'
@Component({
  selector: 'tree-search-example',
  standalone: true,
  imports: [SyncSearch, TreeAsyncSearchExample],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-scenes.html',
})
export class PrimitiveTreeSearchExample {}
