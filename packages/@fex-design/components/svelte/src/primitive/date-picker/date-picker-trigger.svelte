<script lang="ts">
  import { usePickerAppearance } from './appearance-context';
  import type { DatePickerInputProps } from './appearance.types'
  import { getPickerInputProps, getPickerControlProps } from '@fex-design/core/date-picker/safe-props';
import { getDatePickerInputAttributes } from '@fex-design/core/date-picker/input';

  import type { InputVisualOptions } from '@fex-design/core/input/types';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '@fex-design/utils';
  import CalendarIcon from '@fex-design/svelte/icons/calendar.svelte';
  import { InputRoot, InputControl, InputClear, InputPrefix, InputSuffix } from '../input';
  import { useDatePickerContext, type DatePickerContextValue } from './context';
  import { createPickerTrigger } from './create-picker-trigger.svelte';
  import DatePickerTags from './date-picker-tags.svelte';
import { datePickerAffixClassName, datePickerTriggerClassName, datePickerInputPreviewClassName, datePickerMultipleTagsClassName, datePickerMultipleInputClassName } from '@fex-design/components-styles/date-picker';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'>, InputVisualOptions {
    children?: Snippet<[{ props: HTMLAttributes<HTMLElement>; action: ReturnType<typeof createPickerTrigger>['action']; state: DatePickerContextValue }]>;
    inputProps?: DatePickerInputProps;
    suffix?: Snippet;
    prefix?: Snippet;
    placeholder?: string;
  }
  let { children, inputProps, suffix, prefix, placeholder, class: className, onclick, onfocus, ...rest }: Props = $props();
  const context = useDatePickerContext('DatePickerTrigger');
  const appearance = usePickerAppearance();
  const input = $derived(getPickerInputProps(inputProps ?? appearance().inputProps));
  const control = $derived(getPickerControlProps(input));
  const trigger = createPickerTrigger(context);
  function click(event: MouseEvent & { currentTarget: HTMLElement }) { onclick?.(event); trigger.click(event); }
  function focus(event: FocusEvent & { currentTarget: HTMLElement }) { onfocus?.(event); trigger.focus(event); }
</script>

{#if children}
  {@render children({ props: { ...rest, ...trigger.props, class: cn(datePickerTriggerClassName, input.classNames?.root, input.class, className), onclick: click, onfocus: focus }, action: trigger.action, state: context })}
{:else}
  <InputRoot {...rest} size={rest.size ?? input.size ?? 'md'} variant={rest.variant ?? input.variant ?? 'outlined'} style={[input.styles?.root, input.style, rest.style].filter(Boolean).join(';')} action={trigger.action} aria-haspopup="dialog" aria-expanded={context.getOpen()} data-state={context.getOpen() ? 'open' : 'closed'} class={cn(datePickerTriggerClassName, input.classNames?.root, input.class, className)} value={context.getInputValue()} disabled={context.disabled} readOnly={true} onclick={click}>
    {#if prefix ?? input.prefix}<InputPrefix class={input.classNames?.prefix} style={input.styles?.prefix}>{@render (prefix ?? input.prefix)!()}</InputPrefix>{/if}
    {#if context.triggerView.showTags}<DatePickerTags class={datePickerMultipleTagsClassName} />{/if}
    <InputControl {...getDatePickerInputAttributes(control)} class={cn(context.triggerView.preview && datePickerInputPreviewClassName, context.triggerView.hasTags && datePickerMultipleInputClassName, input.classNames?.control)} style={input.styles?.control} placeholder={context.triggerView.hasTags ? '' : (placeholder ?? input.placeholder ?? context.format)} onfocus={event => { control.onfocus?.(event); focus(event); }} />
    <div data-slot="date-picker-affix" class={datePickerAffixClassName}>
      <InputSuffix class={input.classNames?.suffix} style={input.styles?.suffix}>{#if suffix ?? input.suffix}{@render (suffix ?? input.suffix)!()}{:else}<CalendarIcon class="size-4" />{/if}</InputSuffix>
      {#if context.canClear}
        <InputClear class={input.classNames?.clear} style={input.styles?.clear} aria-label="清除日期" onpointerdown={event => { event.preventDefault(); event.stopPropagation(); }} onclick={event => { event.preventDefault(); event.stopPropagation(); context.clear(); }} />
      {/if}
    </div>
  </InputRoot>
{/if}
