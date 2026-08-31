import {
  spinnerClassName,
  spinnerContainerClassName,
  spinnerOverlayClassName,
  spinnerTextClassName,
} from '@fex-design/styles/spinner'
import { cn } from '@fex/utils'
import type { SpinnerOptions } from '@fex-design/core/spinner/types'
import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { LoadingIcon } from '../../icon/loading'
export function SpinnerContainer(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <div
      {...rest}
      data-slot="spinner-container"
      class={cn(spinnerContainerClassName, local.class)}
    />
  )
}
export function Spinner(props: JSX.HTMLAttributes<HTMLSpanElement> & SpinnerOptions) {
  const [local, rest] = splitProps(props, ['class', 'size', 'children'])
  return (
    <span
      {...rest}
      data-slot="spinner"
      role="status"
      class={cn(spinnerClassName({ size: local.size }), local.class)}
    >
      {local.children ?? <LoadingIcon class="animate-spin" />}
    </span>
  )
}
export function SpinnerText(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const [local, rest] = splitProps(props, ['class'])
  return <span {...rest} data-slot="spinner-text" class={cn(spinnerTextClassName, local.class)} />
}
export function SpinnerOverlay(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <div {...rest} data-slot="spinner-overlay" class={cn(spinnerOverlayClassName, local.class)} />
  )
}
