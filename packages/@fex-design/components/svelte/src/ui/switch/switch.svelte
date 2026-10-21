<script lang="ts">
  import type {
    SwitchClassNames,
    SwitchStyles,
  } from "@fex-design/core/switch/types";
  import { cn } from "@fex-design/utils";
  import type { ComponentProps, Snippet } from "svelte";
  import {
    SwitchRoot,
    SwitchContent,
    SwitchThumb,
  } from "@fex-design/svelte/primitive/switch";
  import { Spinner } from "@fex-design/svelte/primitive/spinner";
  type Props = Omit<ComponentProps<typeof SwitchRoot>, "children"> & {
    checkedContentProps?:
      | Omit<ComponentProps<typeof SwitchContent>, "children" | "state">
      | undefined;
    uncheckedContentProps?:
      | Omit<ComponentProps<typeof SwitchContent>, "children" | "state">
      | undefined;
    thumbProps?:
      Omit<ComponentProps<typeof SwitchThumb>, "children"> | undefined;
    spinnerProps?:
      Omit<ComponentProps<typeof Spinner>, "aria-hidden"> | undefined;
    checkedContent?: Snippet | undefined;
    uncheckedContent?: Snippet | undefined;
    classNames?: SwitchClassNames | undefined;
    styles?: SwitchStyles<string> | undefined;
  };
  let {
    checkedContentProps,
    uncheckedContentProps,
    thumbProps,
    spinnerProps,
    checkedContent,
    uncheckedContent,
    loading = false,
    class: className,
    style,
    classNames,
    styles,
    ref = $bindable(null),
    ...rest
  }: Props = $props();
</script>

<SwitchRoot
  {...rest}
  {loading}
  bind:ref
  class={cn(className, classNames?.root)}
  style={[style, styles?.root].filter(Boolean).join(";")}
>
  {#if checkedContent}<SwitchContent
      {...checkedContentProps}
      state="checked"
      class={cn(classNames?.content, checkedContentProps?.class)}
      style={[styles?.content, checkedContentProps?.style]
        .filter(Boolean)
        .join(";")}>{@render checkedContent()}</SwitchContent
    >{/if}
  {#if uncheckedContent}<SwitchContent
      {...uncheckedContentProps}
      state="unchecked"
      class={cn(classNames?.content, uncheckedContentProps?.class)}
      style={[styles?.content, uncheckedContentProps?.style]
        .filter(Boolean)
        .join(";")}>{@render uncheckedContent()}</SwitchContent
    >{/if}
  <SwitchThumb
    {...thumbProps}
    class={cn(classNames?.thumb, thumbProps?.class)}
    style={[styles?.thumb, thumbProps?.style].filter(Boolean).join(";")}
    >{#if loading}<Spinner
        {...spinnerProps}
        aria-hidden="true"
      />{/if}</SwitchThumb
  >
</SwitchRoot>
