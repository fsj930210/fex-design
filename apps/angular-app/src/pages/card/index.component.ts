import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { CardCompositionDemo } from './composition-demo.component'
import { Card } from '@fex-design/angular/ui/card'

type SpacingOption = {
  label: string
  value: 'sm' | 'md' | 'lg' | 'custom'
  size: 'sm' | 'md' | 'lg'
  spacing?: string
}

const defaultSpacingOption: SpacingOption = { label: 'md', value: 'md', size: 'md' }

const spacingOptions: SpacingOption[] = [
  { label: 'sm', value: 'sm', size: 'sm', spacing: '16px' },
  defaultSpacingOption,
  { label: 'lg', value: 'lg', size: 'lg', spacing: '32px' },
  { label: '40px', value: 'custom', size: 'md', spacing: '40px' },
]

@Component({
  selector: 'fex-card-page',
  imports: [CardCompositionDemo, Card, RouterLink],
  host: { class: 'block' },
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  protected readonly spacingOptions = spacingOptions
  protected readonly spacing = signal<SpacingOption['value']>('md')
  protected readonly selectedSpacing = computed(
    () => spacingOptions.find((option) => option.value === this.spacing()) ?? defaultSpacingOption,
  )
}
