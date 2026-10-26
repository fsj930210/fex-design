import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'
import { Input } from '@fex-design/angular/ui/input'
import { TrashIcon } from '@fex-design/angular/icons/trash'
@Component({
  selector: 'div[treeCrudRow]',
  standalone: true,
  imports: [Button, Input, TrashIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './crud-row.html',
})
export class TreeCrudRow {
  readonly busy = input(false)
  readonly title = input.required<string>()
  readonly leaf = input.required<boolean>()
  readonly expanded = input.required<boolean>()
  readonly toggle = output<void>()
  readonly save = output<string>()
  readonly add = output<void>()
  readonly remove = output<void>()
  readonly editing = signal(false)
  readonly draft = signal('')
  private readonly injector = inject(Injector)
  private readonly editor = viewChild(Input)
  edit() {
    this.draft.set(this.title())
    this.editing.set(true)
    afterNextRender(() => this.editor()?.focus(), { injector: this.injector })
  }
  commit() {
    if (!this.editing()) return
    this.editing.set(false)
    const title = this.draft().trim()
    if (title && title !== this.title()) this.save.emit(title)
  }
  keydown(event: KeyboardEvent) {
    event.stopPropagation()
    if (event.key === 'Enter') {
      event.preventDefault()
      this.commit()
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      this.editing.set(false)
    }
  }
}
