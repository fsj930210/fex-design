import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { InputRoot, InputControl } from '@fex-design/angular/primitive/input'
import { Button } from '@fex-design/angular/primitive/button'
export interface PhoneValue {
  countryCode: '+86' | '+852'
  number: string
}
@Component({
  selector: 'div[phoneControl]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputRoot, InputControl, Button],
  host: { class: 'contents' },
  template: `<div class="grid grid-cols-[auto_1fr] items-center gap-2">
    <button button type="button" aria-label="切换区号" (click)="toggleCode()">
      {{ value().countryCode }}
    </button>
    <div inputRoot [value]="value().number">
      <input
        inputControl
        (input)="changeNumber($any($event).target.value)"
        (blur)="blurred.emit()"
        placeholder="请输入号码"
      />
    </div>
  </div>`,
})
export class PhoneControl {
  readonly value = input.required<PhoneValue>()
  readonly valueChange = output<PhoneValue>()
  readonly blurred = output<void>()
  toggleCode() {
    this.valueChange.emit({
      countryCode: this.value().countryCode === '+86' ? '+852' : '+86',
      number: '',
    })
  }
  changeNumber(number: string) {
    this.valueChange.emit({ ...this.value(), number })
  }
}
