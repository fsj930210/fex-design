import { type ComponentProps, type ReactNode, useId } from 'react'
import { getFormErrorMessages } from '@fex-design/core/form/error-messages'
import { formErrorClassName } from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { useIsomorphicLayoutEffect } from '../../hooks/use-isomorphic-layout-effect'
import { useFieldPresentation } from './use-form-field'

export type FormErrorProps = Omit<ComponentProps<'div'>, 'children'> & {
  children?: ReactNode | ((errors: readonly unknown[]) => ReactNode)
}
export function FormError({ children, className, ...props }: FormErrorProps) {
  const { association, errors } = useFieldPresentation()
  const generated = useId()
  const id = props.id ?? `error-${generated}`
  const messages = getFormErrorMessages(errors)
  const content = errors.length
    ? typeof children === 'function'
      ? children(errors)
      : (children ?? messages.map((message) => <div key={message}>{message}</div>))
    : null
  const visible = !!content && !(Array.isArray(content) && content.length === 0)
  // ARIA references exist for rendered feedback only.
  useIsomorphicLayoutEffect(
    () => (visible ? association.register('errors', id) : undefined),
    [association, id, visible],
  )
  return visible ? (
    <div
      aria-live="polite"
      {...props}
      id={id}
      data-slot="form-error"
      className={cn(formErrorClassName, className)}
    >
      {content}
    </div>
  ) : null
}
