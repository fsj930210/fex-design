import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { Checkbox, CheckboxGroup } from '@fex-design/angular/ui/checkbox'
@Component({
  selector: 'checkbox-ui-check-all-example',
  standalone: true,
  imports: [Checkbox, CheckboxGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './check-all.html',
})
export class CheckboxUiCheckAllExample {
  protected readonly values = ['read', 'write', 'publish']
  protected readonly selected = signal<string[]>(['read'])
  protected readonly all = computed(() => this.selected().length === this.values.length)
  protected readonly partial = computed(() => this.selected().length > 0 && !this.all())
  protected toggleAll(event: Event) {
    this.selected.set((event.target as HTMLInputElement).checked ? [...this.values] : [])
  }
  protected groupChange(event: { value: (string | number)[] }) {
    this.selected.set(event.value.map(String))
  }
}
