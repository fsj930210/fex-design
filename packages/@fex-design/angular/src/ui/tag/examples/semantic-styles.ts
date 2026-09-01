import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag } from '@fex-design/angular/ui/tag'
@Component({ selector: 'tag-ui-semantic-styles-example', standalone: true, imports: [Tag], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './semantic-styles.html' })
export class SemanticStyles { protected readonly classNames = { root: 'border-dashed', close: 'hover:opacity-80' }; protected readonly styles = { root: 'max-width:280px;background-color:#f3e8ff;border-color:#9333ea;color:#6b21a8;font-size:16px;font-weight:700;', close: 'margin-inline-start:8px;border-radius:999px;background-color:#7e22ce;color:#fff;' } }
