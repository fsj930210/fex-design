import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/angular/primitive/select'
@Component({
  selector: 'select-semantic-styles-example',
  imports: [SelectRoot, SelectTrigger, SelectContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SelectSemanticStylesExample {
  readonly options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]
  readonly inputProps = {
    classNames: { root: 'rounded-xl', control: 'font-semibold', suffix: 'text-violet-600' },
    styles: { root: 'border-color:#8b5cf6', control: 'letter-spacing:0.04em' },
  }
  readonly valueProps = {
    tagProps: { color: '#7c3aed', class: 'rounded-md font-semibold' },
    overflowTagProps: { color: '#0891b2', class: 'rounded-md font-semibold' },
    tagActionProps: { class: 'rounded-sm text-violet-700 hover:bg-violet-200' },
  }
  readonly triggerProps = { class: 'border-violet-300 bg-white text-violet-800 rounded-md' }
  readonly contentProps = {
    class:
      'border-violet-300 bg-white text-violet-800 [--primary:#6d28d9] [--muted-background:#f5f3ff]',
  }
}
