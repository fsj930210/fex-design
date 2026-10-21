<script lang="ts">
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
  } from "@fex-design/svelte/primitive/empty";
</script>

<Empty
  class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
>
  <EmptyHeader
    class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
  >
    <EmptyMedia
      class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
      ><svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        ><rect
          width="48"
          height="48"
          rx="12"
          fill="currentColor"
          opacity="0.1"
        /></svg
      ></EmptyMedia
    >
    <EmptyTitle
      class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
      >暂无数据</EmptyTitle
    >
    <EmptyDescription
      class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
      >当前没有可展示的数据。</EmptyDescription
    >
  </EmptyHeader>
</Empty>
