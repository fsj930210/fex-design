<script lang="ts">
  import { resolveScrollbarOverflow } from "@fex-design/core/scrollbar/create-scrollbar-controller";
  import { cn } from "@fex-design/utils";
  import {
    ScrollbarRoot,
    ScrollbarViewport,
    ScrollbarBar,
    ScrollbarTrack,
    ScrollbarThumb,
    ScrollbarCorner,
  } from "../../primitive/scrollbar";
  import type { ScrollbarProps } from "./types";

  let {
    children,
    element = $bindable(),
    viewportElement = $bindable(),
    viewportProps,
    horizontalBarProps,
    verticalBarProps,
    horizontalTrackProps,
    verticalTrackProps,
    horizontalThumbProps,
    verticalThumbProps,
    cornerProps,
    classNames,
    styles,
    overflow,
    ...rootProps
  }: ScrollbarProps = $props();
  const axes = ["x", "y"] as const;
  // Both axis branches and Corner use this shared derived policy.
  const resolved = $derived(
    resolveScrollbarOverflow(viewportProps?.overflow, overflow),
  );
</script>

<ScrollbarRoot {...rootProps} {overflow} bind:element>
  <ScrollbarViewport
    {...viewportProps}
    bind:element={viewportElement}
    class={cn(classNames?.viewport, viewportProps?.class)}
    style={[styles?.viewport, viewportProps?.style].filter(Boolean).join(";")}
  >
    {@render children?.()}
  </ScrollbarViewport>
  {#each axes as axis (axis)}
    {#if resolved[axis] === "auto"}
      <ScrollbarBar
        {...axis === "x" ? horizontalBarProps : verticalBarProps}
        {axis}
        class={cn(
          classNames?.[axis === "x" ? "barX" : "barY"],
          (axis === "x" ? horizontalBarProps : verticalBarProps)?.class,
        )}
        style={[
          styles?.[axis === "x" ? "barX" : "barY"],
          (axis === "x" ? horizontalBarProps : verticalBarProps)?.style,
        ]
          .filter(Boolean)
          .join(";")}
      >
        <ScrollbarTrack
          {...axis === "x" ? horizontalTrackProps : verticalTrackProps}
          {axis}
          class={cn(
            classNames?.[axis === "x" ? "trackX" : "trackY"],
            (axis === "x" ? horizontalTrackProps : verticalTrackProps)?.class,
          )}
          style={[
            styles?.[axis === "x" ? "trackX" : "trackY"],
            (axis === "x" ? horizontalTrackProps : verticalTrackProps)?.style,
          ]
            .filter(Boolean)
            .join(";")}
        >
          <ScrollbarThumb
            {...axis === "x" ? horizontalThumbProps : verticalThumbProps}
            {axis}
            class={cn(
              classNames?.[axis === "x" ? "thumbX" : "thumbY"],
              (axis === "x" ? horizontalThumbProps : verticalThumbProps)?.class,
            )}
            style={[
              styles?.[axis === "x" ? "thumbX" : "thumbY"],
              (axis === "x" ? horizontalThumbProps : verticalThumbProps)?.style,
            ]
              .filter(Boolean)
              .join(";")}
          />
        </ScrollbarTrack>
      </ScrollbarBar>
    {/if}
  {/each}
  {#if resolved.x === "auto" && resolved.y === "auto"}
    <ScrollbarCorner
      {...cornerProps}
      class={cn(classNames?.corner, cornerProps?.class)}
      style={[styles?.corner, cornerProps?.style].filter(Boolean).join(";")}
    />
  {/if}
</ScrollbarRoot>
