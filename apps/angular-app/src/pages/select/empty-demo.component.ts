import { Component } from '@angular/core'
import { SimpleSelectDemo } from './simple-demo.component'
export
@Component({
  selector: 'select-empty-demo',
  standalone: true,
  imports: [SimpleSelectDemo],
  template:
    '<select-simple-demo title="Empty" description="An explicit empty state is rendered." [items]="[]" />',
})
class EmptyDemo {}
