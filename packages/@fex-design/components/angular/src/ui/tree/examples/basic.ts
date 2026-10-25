import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BasicContent } from './basic-content'
import { StateDemo } from './state-demo'
@Component({
  selector: 'tree-basic-example',
  standalone: true,
  imports: [BasicContent, StateDemo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic-scenes.html',
})
export class TreeBasicExample {}
