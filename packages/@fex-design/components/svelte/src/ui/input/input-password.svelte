<script lang="ts">
  import { inputActionClassName } from "@fex-design/components-styles/input";
  import EyeIcon from '@fex-design/svelte/icons/eye.svelte';
  import EyeOffIcon from '@fex-design/svelte/icons/eye-off.svelte';
  import Input from "./input.svelte";
  import type { InputPasswordProps } from "./input.types";
  let {
    visibilityToggle = true,
    suffix,
    ...props
  }: InputPasswordProps = $props();
  let visible = $state(false);
</script>

{#snippet passwordSuffix()}{#if suffix}{@render suffix()}{/if}{#if visibilityToggle}<button
      type="button"
      data-slot="input-action"
      aria-label={visible ? "Hide password" : "Show password"}
      aria-pressed={visible}
      class={inputActionClassName}
      onclick={() => (visible = !visible)}
      >{#if visible}<EyeOffIcon />{:else}<EyeIcon />{/if}</button
    >{/if}{/snippet}
<Input
  {...props}
  type={visible ? "text" : "password"}
  suffix={passwordSuffix}
/>
