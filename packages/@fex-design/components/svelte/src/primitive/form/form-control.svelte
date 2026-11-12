<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy } from "svelte";
  import { getFormControlAttributes } from "@fex-design/core/form/control-binding";
  import { createFormControlTarget } from "@fex-design/core/form/control-target";
  import { provideNativeControlTarget } from "@fex-design/svelte/utils/native-control-target";
  import { createFormBinding } from "./create-form-binding.svelte";
  import { getRoot } from "./context";
  let { children }: { children?: Snippet } = $props();
  const scope = createFormBinding();
  const root = getRoot();
  const links = scope.links;
  const registry = createFormControlTarget({
    onTarget: (element, originalId) => {
      const initial = scope.association.getSnapshot().controlId;
      if (originalId) scope.association.setControlId(originalId);
      const detach = root.targets.register({
        name: () => String(scope.field.name),
        invalid: () => scope.presentation().invalid,
        element: () => element,
      });
      return () => {
        detach();
        scope.association.setControlId(initial);
      };
    },
  });
  provideNativeControlTarget(registry.register);
  $effect(() => {
    registry.update(
      getFormControlAttributes(
        $links,
        String(scope.field.name),
        scope.presentation().invalid,
      ),
    );
  });
  onDestroy(() => registry.destroy());
</script>

{@render children?.()}
