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
  } from '@fex-design/svelte/primitive/switch/switch';
  import Spinner from '@fex-design/svelte/primitive/spinner/spinner.svelte';
  type Props = Omit<ComponentProps<typeof SwitchRoot>, "children"> & {
    checkedContent?: Snippet | undefined;
    uncheckedContent?: Snippet | undefined;
    classNames?: SwitchClassNames | undefined;
    styles?: SwitchStyles<string> | undefined;
  };
  let {
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
  style={`${typeof style === "string" ? style : ""}${styles?.root ?? ""}`}
>
  {#if checkedContent}<SwitchContent
      state="checked"
      class={classNames?.content}
      style={styles?.content}>{@render checkedContent()}</SwitchContent
    >{/if}
  {#if uncheckedContent}<SwitchContent
      state="unchecked"
      class={classNames?.content}
      style={styles?.content}>{@render uncheckedContent()}</SwitchContent
    >{/if}
  <SwitchThumb class={classNames?.thumb} style={styles?.thumb}
    >{#if loading}<Spinner aria-hidden="true" />{/if}</SwitchThumb
  >
</SwitchRoot>
