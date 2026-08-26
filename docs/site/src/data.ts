import type { ComponentApi } from './types'
import buttonApi from '../../api/ui/button.json'
import primitiveButtonApi from '../../api/primitive/button.json'
import cardApi from '../../api/ui/card.json'
import primitiveCardApi from '../../api/primitive/card.json'
import { buttonExamples } from '@fex-design/docs-shared/button-manifest'
import { cardExamples } from '@fex-design/docs-shared/card-manifest'

export const componentApis = {
  button: { primitive: primitiveButtonApi, ui: buttonApi },
  card: { primitive: primitiveCardApi, ui: cardApi },
} as const satisfies Record<string, Record<'primitive' | 'ui', ComponentApi>>
export const componentExamples = { button: buttonExamples, card: cardExamples } as const
export type DocumentedComponent = keyof typeof componentApis
export function isDocumentedComponent(slug: string): slug is DocumentedComponent {
  return slug in componentApis
}
