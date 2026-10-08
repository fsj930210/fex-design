import { createComponent, type JSX } from 'solid-js'
import { useFormContext } from '../form'
import { FormFieldNameContext, withRenderingFieldName } from './field-context'

/** The only public field-state entry point. Native TanStack Field props are forwarded unchanged. */
export function Field(props: {
  name: string
  children: (field: any) => JSX.Element
  [key: string]: unknown
}) {
  const form = useFormContext()
  const fieldProps = {
    ...props,
    children: (field: any) => {
      const fieldName = String(field.name ?? props.name)
      return withRenderingFieldName(fieldName, () => (
        <FormFieldNameContext.Provider value={fieldName}>
          {props.children(field)}
        </FormFieldNameContext.Provider>
      ))
    },
  }
  return createComponent(form.Field as (fieldProps: typeof props) => JSX.Element, fieldProps)
}
