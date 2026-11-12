import { mergeStyle } from '../../primitives/merge-style'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import type { AnyFormApi } from '@tanstack/solid-form'
import { createFormTargets, scrollToField } from '@fex-design/core/form/field-targets'
import type { FormLayoutOptions, FormScrollToFirstError } from '@fex-design/core/form/types'
import {
  formRootClassName,
  formLayoutClassName,
  formLayoutStyle,
} from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { callEventHandler } from '../../primitives/call-event-handler'
import { RootContext } from './context'
export type FormRootProps = ParentProps<
  Omit<JSX.FormHTMLAttributes<HTMLFormElement>, 'form'> &
    FormLayoutOptions & {
      form: AnyFormApi
      component?: 'form' | false
      scrollToFirstError?: FormScrollToFirstError
    }
>
export function FormRoot(props: FormRootProps) {
  const [local, rest] = splitProps(props, [
    'form',
    'layout',
    'labelAlign',
    'labelWidth',
    'labelGap',
    'labelWrap',
    'style',
    'component',
    'scrollToFirstError',
    'children',
    'class',
    'onSubmit',
    'onReset',
  ])
  const form = local.form
  const targets = createFormTargets()
  return (
    <RootContext.Provider value={{ form, targets }}>
      {local.component === false ? (
        local.children
      ) : (
        <form
          {...rest}
          data-slot="form-root"
          noValidate={rest.noValidate ?? true}
          class={cn(formRootClassName, formLayoutClassName, local.class)}
          style={mergeStyle(formLayoutStyle(local.labelWidth, local.labelGap), local.style)}
          data-layout={local.layout ?? 'vertical'}
          data-label-align={local.labelAlign ?? 'end'}
          data-label-wrap={String(local.labelWrap ?? false)}
          onReset={(event) => {
            callEventHandler(local.onReset, event)
            if (event.defaultPrevented) return
            event.preventDefault()
            form.reset()
          }}
          onClick={(event) => {
            const target = event.target as HTMLElement | null
            const button = target?.closest('button')
            if (button?.type !== 'reset') return
            event.preventDefault()
            form.reset()
          }}
          onSubmit={async (event) => {
            callEventHandler(local.onSubmit, event)
            if (event.defaultPrevented) return
            event.preventDefault()
            if (local.form !== form)
              throw new Error('Remount FormRoot to replace its form instance.')
            await form.handleSubmit()
            if (local.scrollToFirstError === false || form.state.isValid) return
            scrollToField(
              targets,
              undefined,
              typeof local.scrollToFirstError === 'boolean' ? {} : local.scrollToFirstError,
            )
          }}
        >
          {local.children}
        </form>
      )}
    </RootContext.Provider>
  )
}
