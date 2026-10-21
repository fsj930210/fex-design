import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/angular/primitive/select'
@Component({
  selector: 'select-css-variables-example',
  imports: [SelectRoot, SelectTrigger, SelectContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class SelectCssVariablesExample {
  readonly options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]
  readonly inputProps = {}
  readonly valueProps = {
    tagProps: { class: '[--tag-color:#7c3aed] [--tag-color-foreground:#ffffff]' },
    overflowTagProps: { class: '[--tag-color:#0891b2] [--tag-color-foreground:#ffffff]' },
    tagActionProps: { class: 'text-[var(--tag-color)]' },
  }
  readonly triggerProps = {
    class:
      '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
  }
  readonly contentProps = {
    class:
      '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
  }
}
