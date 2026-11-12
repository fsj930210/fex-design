<script lang="ts" generics="TSelected">
  import type { Snippet } from "svelte";
  import { useSelector, type AnyFormState } from "@tanstack/svelte-form";
  import { getRoot } from "../../primitive/form/context";
  let {
    selector,
    children,
  }: {
    selector: (state: AnyFormState) => TSelected;
    children: Snippet<[TSelected]>;
  } = $props();
  const selected = useSelector(getRoot().form.store, (state) =>
    selector(state),
  );
</script>

{@render children(selected.current)}
