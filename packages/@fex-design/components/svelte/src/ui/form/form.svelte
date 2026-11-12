<script lang="ts">
  import type { ComponentProps } from "svelte";
  import type { Snippet } from "svelte";
  import { cn } from "@fex-design/utils";
  import type { FormClassNames, FormStyles } from "./form.types";
  import FormRoot from "../../primitive/form/form-root.svelte";
  let {
    children,
    class: className,
    style,
    classNames,
    styles,
    ...rest
  }: ComponentProps<typeof FormRoot> & {
    children?: Snippet;
    class?: string;
    style?: string;
    classNames?: FormClassNames;
    styles?: FormStyles;
  } = $props();
</script>

<FormRoot
  {...rest}
  class={cn(classNames?.root, className)}
  style={styles?.root ?? style}>{@render children?.()}</FormRoot
>
