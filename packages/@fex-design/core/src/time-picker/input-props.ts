/** The controller owns the text input's value, element type and editing path. */
export type TimePickerManagedInputProp =
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'defaultvalue'
  | 'disabled'
  | 'readOnly'
  | 'readonly'
  | 'onInput'
  | 'onInputCapture'
  | 'oninput'
  | 'oninputcapture'
  | 'onChange'
  | 'onChangeCapture'
  | 'onchange'
  | 'onchangecapture'
  | 'on:input'
  | 'on:change'
  | 'aria-haspopup'
  | 'aria-expanded'
  | 'data-slot'
  | 'data-state'

const managedInputProps = new Set([
  'type',
  'value',
  'defaultvalue',
  'disabled',
  'readonly',
  'oninput',
  'oninputcapture',
  'onchange',
  'onchangecapture',
  'on:input',
  'on:change',
  'aria-haspopup',
  'aria-expanded',
  'data-slot',
  'data-state',
])

/** Also enforce ownership for JavaScript callers and objects with extra keys. */
export function filterTimePickerInputProps<T extends object>(
  props: T | undefined,
): Omit<T, TimePickerManagedInputProp> {
  const entries = Object.entries(props ?? {}).filter(
    ([name]) => !managedInputProps.has(name.toLowerCase()),
  )
  // Entries retain their original values; only the owned keys have been removed.
  return Object.fromEntries(entries) as Omit<T, TimePickerManagedInputProp>
}
