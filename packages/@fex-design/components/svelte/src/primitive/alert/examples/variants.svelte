<script lang="ts">
  import {
    AlertTitle,
    AlertIcon,
    Alert,
  } from "@fex-design/svelte/primitive/alert";
  import InfoIcon from "@fex-design/svelte/icons/info.svelte";
</script>

<div class="grid w-full gap-3">
  <Alert variant="filled"
    ><AlertIcon><InfoIcon /></AlertIcon><AlertTitle>Filled Alert</AlertTitle
    ></Alert
  >
  <Alert variant="outlined"
    ><AlertIcon><InfoIcon /></AlertIcon><AlertTitle>Outlined Alert</AlertTitle
    ></Alert
  >
  <Alert variant="solid"
    ><AlertIcon><InfoIcon /></AlertIcon><AlertTitle>Solid Alert</AlertTitle
    ></Alert
  >
</div>
