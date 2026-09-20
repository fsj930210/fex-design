import { Component } from '@angular/core'
import { frameworkOptions } from './data'
import { SimpleSelectDemo } from './simple-demo.component'
export
@Component({
  selector: 'select-clear-demo',
  standalone: true,
  imports: [SimpleSelectDemo],
  template:
    '<select-simple-demo title="Clear" description="Clear and indicator share one suffix." [items]="options" [clearable]="true" defaultValue="solid" />',
})
class ClearDemo {
  protected readonly options = frameworkOptions
}
