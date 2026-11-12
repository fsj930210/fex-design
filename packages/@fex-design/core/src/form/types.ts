export type FormLayout = 'vertical' | 'horizontal' | 'inline'
export interface FormLayoutOptions {
  layout?: FormLayout
  labelAlign?: 'start' | 'end'
  labelWidth?: string | number
  labelGap?: string | number
  labelWrap?: boolean
}

export type FormErrorVisibility = 'touched' | 'submit' | 'always'

export interface FormFieldSnapshot {
  value: unknown
  meta: { errors: readonly unknown[]; isTouched: boolean; isValidating: boolean }
}

export interface FieldBindingOptions<TValue = unknown, TArgs extends unknown[] = unknown[]> {
  valuePropName?: string | undefined
  trigger?: string | undefined
  getValueFromEvent?: ((...args: TArgs) => TValue) | undefined
  getValueProps?: ((value: TValue) => Record<string, unknown>) | undefined
}

export interface ValuePort<TValue> {
  read(): TValue
  write(next: TValue): void
}

export interface FormControlOptions<
  TValue = unknown,
  TArgs extends unknown[] = unknown[],
> extends FieldBindingOptions<TValue, TArgs> {
  target?: (() => HTMLElement | null) | undefined
}

export interface FormAssociation {
  controlId: string
  labels: readonly string[]
  descriptions: readonly string[]
  errors: readonly string[]
  required: boolean
}

export interface FormTarget {
  name: () => string
  invalid: () => boolean
  element: () => HTMLElement | null
}

export interface FormScrollOptions extends ScrollIntoViewOptions {
  focus?: boolean | undefined
}

export type FormScrollToFirstError = boolean | FormScrollOptions
