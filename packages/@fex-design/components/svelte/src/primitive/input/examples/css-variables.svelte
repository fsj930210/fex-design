<script lang="ts">
  import {
    InputGroup,
    InputRoot,
    InputControl,
    InputAddonBefore,
    InputAddonAfter,
  } from "@fex-design/svelte/primitive/input";
  import { Button } from "@fex-design/svelte/primitive/button";
</script>

<div class="grid w-full max-w-md gap-3">
  <p>Button: Before / After</p>
  <InputGroup
    class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]"
    ><InputAddonBefore
      class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]"
      ><Button color="info" variant="filled">Before</Button></InputAddonBefore
    ><InputRoot
      class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]"
      defaultValue="Design"
      ><InputControl
        class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]"
      /></InputRoot
    ><InputAddonAfter
      class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]"
      ><Button color="success" variant="solid">After</Button></InputAddonAfter
    ></InputGroup
  >
</div>
