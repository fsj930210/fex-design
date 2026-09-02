import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert, AlertActionContent } from '../alert'
@Component({ selector: 'alert-semantic-styles-example', standalone: true, imports: [Alert, AlertActionContent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './semantic-styles.html' })
export class AlertSemanticStylesExample { protected readonly classNames = { title: 'uppercase tracking-wide', icon: 'rounded-full bg-white/70 p-0.5' }; protected readonly styles = { action: 'border-radius:999px;background:rgb(255 255 255 / 0.7);padding:2px 8px', close: 'color:#831843' } }
