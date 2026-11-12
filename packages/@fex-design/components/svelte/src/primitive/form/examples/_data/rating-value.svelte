<script lang="ts">
  let {
    value = 0,
    onChange,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
  }: {
    value?: number;
    onChange?: (value: number) => void;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  } = $props();
</script>

<div
  role="radiogroup"
  aria-label="满意度"
  aria-invalid={ariaInvalid}
  aria-describedby={ariaDescribedBy}
  class="flex gap-2 rounded-md border border-transparent p-2 transition-colors aria-[invalid=true]:border-danger aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger/20"
>
  {#each [1, 2, 3, 4, 5] as item}
    <button
      type="button"
      role="radio"
      aria-checked={value === item}
      class={value === item
        ? "rounded-md bg-primary px-3 py-2 text-primary-foreground"
        : "rounded-md border border-border px-3 py-2"}
      onclick={() => onChange?.(item)}>{item}</button
    >
  {/each}
</div>
