import { Component } from '@angular/core'
import { frameworkOptions } from './data'
import { SimpleSelectDemo } from './simple-demo.component'
export
@Component({
  selector: 'select-group-demo',
  standalone: true,
  imports: [SimpleSelectDemo],
  template:
    '<select-simple-demo title="Group" description="Options sharing a group render below a label." [items]="options" />',
})
class GroupDemo {
  protected readonly options = frameworkOptions
}
