import { NgTemplateOutlet } from '@angular/common'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
} from '@angular/core'
import {
  FormControl,
  FormField as PrimitiveFormField,
  FormLabel,
  FormDescription,
  FormError,
} from '../../primitive/form'
import type { DeepKeys } from '@tanstack/angular-form'
import { TanStackField } from '@tanstack/angular-form'
import type { FormClassNames, FormStyles } from './form.types'
import { formFieldClassName } from '@fex-design/components-styles/form'

@Component({
  selector: 'div[formField]',
  standalone: true,
  imports: [FormLabel, FormDescription, FormError, NgTemplateOutlet],
  hostDirectives: [
    FormControl,
    {
      directive: PrimitiveFormField,
      inputs: [],
    },
    {
      directive: TanStackField,
      inputs: ['tanstackField', 'name', 'validators', 'defaultValue', 'listeners', 'mode'],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'form-field',
    '[class]': 'formFieldClassName + " " + classNames().field',
    '[style]': 'styles().field',
  },
  template: `
    @if (label(); as labelTemplate) {
      <label formLabel [required]="required()" [class]="classNames().label" [style]="styles().label"
        ><ng-container [ngTemplateOutlet]="labelTemplate"
      /></label>
    }
    <ng-content />
    @if (description(); as descriptionTemplate) {
      <p formDescription [class]="classNames().description" [style]="styles().description">
        <ng-container [ngTemplateOutlet]="descriptionTemplate" />
      </p>
    }
    @if (showError()) {
      <div formError [class]="classNames().error" [style]="styles().error">
        <ng-container [ngTemplateOutlet]="error()" />
      </div>
    }
  `,
})
export class FormField<
  TData = Record<string, unknown>,
  TName extends DeepKeys<TData> = DeepKeys<TData>,
> {
  protected readonly formFieldClassName = formFieldClassName
  readonly label = input<TemplateRef<unknown>>()
  readonly description = input<TemplateRef<unknown>>()
  readonly error = input<TemplateRef<unknown>>()
  readonly required = input(false, { transform: booleanAttribute })
  readonly showError = input(true, { transform: booleanAttribute })
  readonly classNames = input<Pick<FormClassNames, 'field' | 'label' | 'description' | 'error'>>({})
  readonly styles = input<Pick<FormStyles, 'field' | 'label' | 'description' | 'error'>>({})
}
