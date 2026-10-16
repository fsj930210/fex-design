<script lang="ts">
  import { timePickerAffixClassName } from '@fex-design/components-styles/time-picker';
  import { getContext, type Snippet, type ComponentProps } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import ClockIcon from '@fex-design/svelte/icons/clock.svelte';
  import { InputRoot, InputControl, InputClear, InputPrefix, InputSuffix } from '../input';
  import { createTimePickerTrigger } from './create-time-picker-trigger.svelte';
  import type { InputVisualOptions } from '@fex-design/core/input/types';
  import { timePickerContextKey, type TimePickerContext } from './context';
  type Binding = { props: HTMLAttributes<HTMLElement>; action: ReturnType<typeof createTimePickerTrigger>['action']; state: TimePickerContext };
  type Props = Omit<HTMLAttributes<HTMLElement>, 'children' | 'prefix'> & InputVisualOptions & {
    inputProps?: Omit<ComponentProps<typeof InputControl>, 'value' | 'defaultValue'>;
    children?: Snippet<[Binding]>; allowClear?: boolean; placeholder?: string; invalid?: boolean; prefix?: Snippet; suffix?: Snippet;
  };
  let { children, allowClear = true, placeholder, invalid = false, prefix, suffix, inputProps, onclick, onfocusin, onfocusout, ...rest }: Props = $props();
  const context = getContext<TimePickerContext>(timePickerContextKey);
  const canClear = $derived(allowClear && Boolean(context.snapshot().inputValue) && !context.disabled() && !context.readOnly());
  const trigger = createTimePickerTrigger();
  function click(event: MouseEvent & { currentTarget: HTMLElement }) { onclick?.(event); trigger.click(event); }
  function focus(event: FocusEvent & { currentTarget: HTMLElement }) { onfocusin?.(event); trigger.focus(event); }
  function blur(event: FocusEvent & { currentTarget: HTMLElement }) { onfocusout?.(event); trigger.blur(event); }
</script>
{#if children}
  {@render children({ props: { ...rest, ...trigger.props(), onclick: click, onfocusin: focus, onfocusout: blur }, action: trigger.action, state: context })}
{:else}
  <InputRoot {...rest} action={trigger.action} aria-haspopup="dialog" aria-expanded={trigger.props()['aria-expanded']} value={context.snapshot().inputValue} disabled={context.disabled()} readOnly={context.readOnly()} onValueChange={context.controller.input} onclick={click} onfocusin={focus} onfocusout={blur}>
    {#if prefix}<InputPrefix>{@render prefix()}</InputPrefix>{/if}
    <InputControl aria-label="Time" {...inputProps} aria-invalid={invalid || inputProps?.['aria-invalid']} placeholder={placeholder ?? inputProps?.placeholder ?? context.format()} />
    <div data-slot="time-picker-affix" class={timePickerAffixClassName}>
      <InputSuffix>{#if suffix}{@render suffix()}{:else}<ClockIcon class="size-4" />{/if}</InputSuffix>
      {#if canClear}<InputClear onpointerdown={event => { event.preventDefault(); event.stopPropagation(); }} onclick={event => { event.preventDefault(); event.stopPropagation(); context.controller.clear(); }} />{/if}
    </div>
  </InputRoot>
{/if}
