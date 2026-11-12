import { type ComponentProps, type ReactNode, useId } from 'react'
import type { AnyFormApi } from '@tanstack/react-form'
import { createFormTargets, scrollToField } from '@fex-design/core/form/field-targets'
import type { FormLayoutOptions, FormScrollToFirstError } from '@fex-design/core/form/types'
import {
  formRootClassName,
  formLayoutClassName,
  formLayoutStyle,
} from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { useLazyRef } from '../../hooks/use-lazy-ref'
import { RootContext } from './context'

export type FormRootProps = Omit<ComponentProps<'form'>, 'form'> &
  FormLayoutOptions & {
    form: AnyFormApi
    component?: 'form' | false
    scrollToFirstError?: FormScrollToFirstError
    children?: ReactNode
  }
export function FormRoot({
  form,
  component = 'form',
  layout = 'vertical',
  labelAlign = 'end',
  labelWidth,
  labelGap,
  labelWrap = false,
  style,
  scrollToFirstError = true,
  children,
  className,
  onSubmit,
  onReset,
  ...props
}: FormRootProps) {
  const initialForm = useLazyRef(() => form).current
  if (form !== initialForm) throw new Error('Remount FormRoot to replace its form instance.')
  const targets = useLazyRef(createFormTargets).current
  const id = useId()
  return (
    <RootContext value={{ form, targets }}>
      {component === false ? (
        children
      ) : (
        <form
          {...props}
          id={props.id ?? id}
          className={cn(formRootClassName, formLayoutClassName, className)}
          style={{ ...formLayoutStyle(labelWidth, labelGap), ...style }}
          data-layout={layout}
          data-label-align={labelAlign}
          data-label-wrap={String(labelWrap)}
          data-slot="form-root"
          noValidate={props.noValidate ?? true}
          onReset={(event) => {
            onReset?.(event)
            if (event.defaultPrevented) return
            event.preventDefault()
            form.reset()
          }}
          onSubmit={async (event) => {
            onSubmit?.(event)
            if (event.defaultPrevented) return
            event.preventDefault()
            event.stopPropagation()
            await form.handleSubmit()
            if (!scrollToFirstError || form.state.isValid) return
            // A single frame is a DOM commit boundary, not an invalid-node polling loop.
            await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
            scrollToField(
              targets,
              undefined,
              typeof scrollToFirstError === 'boolean' ? {} : scrollToFirstError,
            )
          }}
        >
          {children}
        </form>
      )}
    </RootContext>
  )
}
