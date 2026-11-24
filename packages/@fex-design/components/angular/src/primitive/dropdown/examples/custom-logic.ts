import { ChangeDetectionStrategy, Component, ElementRef, effect, viewChild } from '@angular/core'
import { createDropdown } from '@fex-design/angular/primitive/dropdown'

@Component({
  selector: 'dropdown-custom-logic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <button
        #trigger
        type="button"
        aria-haspopup="menu"
        [attr.aria-expanded]="binding.snapshot().open"
        class="rounded-md border px-3 py-2"
        (click)="binding.controller.overlay.toggle()"
        (keydown)="binding.controller.triggerKeyDown($event)"
      >
        操作
      </button>
      @if (binding.snapshot().mounted) {
        <div
          #content
          role="menu"
          aria-label="操作"
          tabindex="-1"
          [hidden]="binding.snapshot().phase === 'closed'"
          [attr.inert]="binding.snapshot().open ? null : ''"
          class="flex flex-col rounded-md border bg-background p-1 shadow-md"
          style="position: var(--floating-strategy, absolute); left: var(--floating-x, 0px); top: var(--floating-y, 0px)"
        >
          <button #rename type="button" class="rounded px-3 py-2 text-start">重命名</button>
          <button #duplicate type="button" class="rounded px-3 py-2 text-start">复制</button>
        </div>
      }
      <output>最近选择：{{ binding.menuSnapshot().value.join(', ') || '尚未选择' }}</output>
    </div>
  `,
})
export class DropdownCustomLogicExample {
  readonly binding = createDropdown(() => ({}))
  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger')
  private readonly content = viewChild<ElementRef<HTMLDivElement>>('content')
  private readonly rename = viewChild<ElementRef<HTMLButtonElement>>('rename')
  private readonly duplicate = viewChild<ElementRef<HTMLButtonElement>>('duplicate')
  constructor() {
    // View query changes synchronize external DOM registrations and release replaced hosts.
    effect((cleanup) => {
      const host = this.trigger()?.nativeElement
      if (host) cleanup(this.binding.controller.bindTrigger(host))
    })
    effect((cleanup) => {
      const host = this.content()?.nativeElement
      if (host) cleanup(this.binding.controller.bindFloatingContent(host))
    })
    effect((cleanup) => {
      const host = this.rename()?.nativeElement
      if (host) cleanup(this.binding.controller.dom.bindItem(host, () => ({ value: 'rename' })))
    })
    effect((cleanup) => {
      const host = this.duplicate()?.nativeElement
      if (host) cleanup(this.binding.controller.dom.bindItem(host, () => ({ value: 'duplicate' })))
    })
  }
}
