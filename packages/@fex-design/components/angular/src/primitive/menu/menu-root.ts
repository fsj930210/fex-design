import {
  booleanAttribute,
  Component,
  ChangeDetectionStrategy,
  Injector,
  inject,
  input,
  output,
  runInInjectionContext,
  type OnInit,
} from '@angular/core'
import type { MenuLayout, MenuChangeInfo, MenuActivateInfo } from '@fex-design/core/menu/types'
import { MENU_LEVEL } from './context'
import { useMenu } from './use-menu'
@Component({
  selector: 'div[menuRoot]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MENU_LEVEL, useValue: undefined }],
  host: { '[style.display]': "'contents'" },
  template: '<ng-content />',
})
export class MenuRoot implements OnInit {
  readonly layout = input<MenuLayout>('vertical')
  readonly dir = input<'ltr' | 'rtl'>('ltr')
  readonly size = input<'sm' | 'md' | 'lg'>('md')
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly multiple = input(false, { transform: booleanAttribute })
  readonly value = input<readonly string[]>()
  readonly defaultValue = input<readonly string[]>()
  readonly openValues = input<readonly string[]>()
  readonly defaultOpenValues = input<readonly string[]>()
  readonly inlineAccordion = input(false, { transform: booleanAttribute })
  readonly submenuTrigger = input<'click' | 'hover'>('click')
  readonly openDelay = input(100)
  readonly closeDelay = input(180)
  readonly valueChange = output<string[]>()
  readonly openValuesChange = output<string[]>()
  readonly change = output<{ value: string[]; info: MenuChangeInfo }>()
  readonly openChange = output<{ value: string[]; info: MenuChangeInfo }>()
  readonly activate = output<MenuActivateInfo>()
  private readonly injector = inject(Injector)
  binding!: ReturnType<typeof useMenu>
  ngOnInit() {
    // Defaults are read once after Angular binds the initial inputs.
    this.binding = runInInjectionContext(this.injector, () =>
      useMenu(() => ({
        layout: this.layout(),
        dir: this.dir(),
        size: this.size(),
        disabled: this.disabled(),
        multiple: this.multiple(),
        value: this.value(),
        defaultValue: this.defaultValue(),
        openValues: this.openValues(),
        defaultOpenValues: this.defaultOpenValues(),
        inlineAccordion: this.inlineAccordion(),
        submenuTrigger: this.submenuTrigger(),
        openDelay: this.openDelay(),
        closeDelay: this.closeDelay(),
        onValueChange: (value, info) => {
          this.valueChange.emit(value)
          this.change.emit({ value, info })
        },
        onOpenChange: (value, info) => {
          this.openValuesChange.emit(value)
          this.openChange.emit({ value, info })
        },
        onActivate: (info) => this.activate.emit(info),
      })),
    )
  }
}
