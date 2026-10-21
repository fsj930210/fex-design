<script lang="ts">
  import { isBadgePresetColor, type BadgeOptions } from "@fex-design/core";
  import { badgeClassName } from "@fex-design/components-styles/badge";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props
    extends
      Omit<HTMLAttributes<HTMLSpanElement>, "class" | "color">,
      BadgeOptions {
    class?: string;
    children?: Snippet;
  }
  let {
    class: className,
    children,
    color,
    size = "md",
    count,
    showZero = false,
    overflowCount,
    style,
    ...rest
  }: Props = $props();
  const value = $derived(
    typeof count === "number" &&
      overflowCount !== undefined &&
      count > overflowCount
      ? `${overflowCount}+`
      : count,
  );
  const visible = $derived(
    (value !== undefined && value !== null && (value !== 0 || showZero)) ||
      children !== undefined,
  );
  const presetColor = $derived(isBadgePresetColor(color) ? color : undefined);
</script>

{#if visible}<span
    {...rest}
    data-slot="badge"
    data-color={color ?? "default"}
    data-size={size}
    class={cn(badgeClassName({ color: presetColor, size }), className)}
    style={[style, color && !presetColor ? `--badge-color:${color}` : ""]
      .filter(Boolean)
      .join(";") || undefined}
    >{#if value !== undefined}{value}{:else}{@render children?.()}{/if}</span
  >{/if}
