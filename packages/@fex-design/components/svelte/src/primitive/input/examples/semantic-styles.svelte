<script lang="ts">
  import {
    InputRoot,
    InputPrefix,
    InputControl,
    InputClear,
    InputSuffix,
    InputGroup,
    InputAddonAfter,
  } from "@fex-design/svelte/primitive/input";
  import { Button } from "@fex-design/svelte/primitive/button";
  import {
    inputActionClassName,
    inputSearchAddonClassName,
  } from "@fex-design/components-styles/input";
  import { cn } from "@fex-design/utils";
  import EyeIcon from "@fex-design/svelte/icons/eye";
  import EyeOffIcon from "@fex-design/svelte/icons/eye-off";
  import SearchIcon from "@fex-design/svelte/icons/search";
  let value = $state("structured");
  let visible = $state(false);
</script>

<div class="grid w-full gap-3">
  <InputRoot
    {value}
    onValueChange={(next) => (value = next)}
    class="border-violet-300 hover:border-violet-400 focus-within:border-violet-600 focus-within:ring-violet-600/20"
    ><InputPrefix class="text-violet-500">@</InputPrefix><InputControl
      class="font-medium"
    />{#if value}<InputClear class="hover:text-violet-700" />{/if}</InputRoot
  ><InputRoot defaultValue="secret"
    ><InputControl type={visible ? "text" : "password"} /><InputSuffix
      ><button
        type="button"
        data-slot="input-action"
        class={cn(inputActionClassName, "text-violet-500")}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onclick={() => (visible = !visible)}
        >{#if visible}<EyeOffIcon />{:else}<EyeIcon />{/if}</button
      ></InputSuffix
    ></InputRoot
  ><InputGroup
    ><InputRoot
      defaultValue="主题"
      class="[--input-background:#faf5ff] [--input-border-color:#d8b4fe] [--input-ring-color:#9333ea]"
      ><InputControl /></InputRoot
    ><InputAddonAfter
      ><Button
        variant="solid"
        color="primary"
        data-input-addon-fill=""
        aria-label="Search"
        class={inputSearchAddonClassName}><SearchIcon /></Button
      ></InputAddonAfter
    ></InputGroup
  >
</div>
