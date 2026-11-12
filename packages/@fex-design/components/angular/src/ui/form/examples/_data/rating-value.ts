import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'

@Component({
  selector: 'div[ratingValue]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex gap-2 rounded-md border border-transparent p-2 transition-colors' },
  template: `<div role="radiogroup" aria-label="满意度" class="flex gap-2">
    @for (item of items; track item) {
      <button
        type="button"
        role="radio"
        [attr.aria-checked]="value() === item"
        (click)="change.emit(item)"
      >
        {{ item }}
      </button>
    }
  </div>`,
})
export class RatingValue {
  readonly value = input(0)
  readonly change = output<number>()
  readonly items = [1, 2, 3, 4, 5]
}
