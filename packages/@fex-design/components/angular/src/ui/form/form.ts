import { Directive, input } from '@angular/core'
import { FormRoot } from '../../primitive/form/form-root'
import type { FormClassNames, FormStyles } from './form.types'

@Directive({
  selector: 'form[uiForm],div[uiForm]',
  standalone: true,
  hostDirectives: [
    {
      directive: FormRoot,
      inputs: [
        'form',
        'noValidate',
        'scrollToFirstError',
        'layout',
        'labelAlign',
        'labelWidth',
        'labelGap',
        'labelWrap',
      ],
    },
  ],
  host: { 'data-slot': 'form', '[class]': 'classNames().root', '[style]': 'styles().root' },
  exportAs: 'form',
})
export class Form {
  readonly component = input<'form' | false>('form')
  readonly classNames = input<FormClassNames>({})
  readonly styles = input<FormStyles>({})
}
