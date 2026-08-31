import {
  cardClassName,
  cardContentClassName,
  cardDescriptionClassName,
  cardExtraClassName,
  cardFooterClassName,
  cardHeaderClassName,
  cardTitleClassName,
} from '@fex-design/styles/card'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { cn } from '@fex/utils'
import { createHostClassName } from '../../signals/host-class'

@Component({
  selector: 'div[card]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ':host { display: block; }',
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'card',
  },
  template: '<ng-content />',
})
export class Card {
  protected readonly hostClassName = createHostClassName(cardClassName)
}

@Component({
  selector: 'div[cardHeader]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'card-header',
  },
  template: '<ng-content />',
})
export class CardHeader {
  className = input<string | undefined>()
  protected readonly hostClassName = createHostClassName(() =>
    cn(cardHeaderClassName, this.className()),
  )
}

@Component({
  selector: 'div[cardTitle]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'card-title',
  },
  template: '<ng-content />',
})
export class CardTitle {
  className = input<string | undefined>()
  protected readonly hostClassName = createHostClassName(() =>
    cn(cardTitleClassName, this.className()),
  )
}

@Component({
  selector: 'div[cardDescription]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'card-description',
  },
  template: '<ng-content />',
})
export class CardDescription {
  className = input<string | undefined>()
  protected readonly hostClassName = createHostClassName(() =>
    cn(cardDescriptionClassName, this.className()),
  )
}

@Component({
  selector: 'div[cardExtra]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'card-extra',
  },
  template: '<ng-content />',
})
export class CardExtra {
  className = input<string | undefined>()
  protected readonly hostClassName = createHostClassName(() =>
    cn(cardExtraClassName, this.className()),
  )
}

@Component({
  selector: 'div[cardContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'card-content',
  },
  template: '<ng-content />',
})
export class CardContent {
  className = input<string | undefined>()
  protected readonly hostClassName = createHostClassName(() =>
    cn(cardContentClassName, this.className()),
  )
}

@Component({
  selector: 'div[cardFooter]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'card-footer',
  },
  template: '<ng-content />',
})
export class CardFooter {
  className = input<string | undefined>()
  protected readonly hostClassName = createHostClassName(() =>
    cn(cardFooterClassName, this.className()),
  )
}
