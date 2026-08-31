import { ChangeDetectionStrategy, Component } from '@angular/core'
import { customFieldOptions } from './data'
import { SimpleCascaderDemo } from './simple-demo.component'
export
@Component({
  selector: 'fex-cascader-field-names-demo',
  standalone: true,
  imports: [SimpleCascaderDemo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    '<fex-cascader-simple-demo title="Field names" description="One declarative mapping adapts backend data." [options]="options" [fieldNames]="fields" />',
})
class FieldNamesDemo {
  readonly options = customFieldOptions
  readonly fields = { value: 'id', label: 'name', children: 'nodes', disabled: 'unavailable' }
}
