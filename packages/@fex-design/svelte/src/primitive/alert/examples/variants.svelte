<script lang="ts">
  import AlertTitle from '../alert-title.svelte'
  import AlertIcon from '../alert-icon.svelte'
  import Alert from '../alert.svelte'
  import CircleInfoIcon from '../../../icon/circle-info.svelte'
</script>

<div class="grid w-full gap-3">
  <Alert variant="filled"><AlertIcon><CircleInfoIcon /></AlertIcon><AlertTitle>Filled Alert</AlertTitle></Alert>
  <Alert variant="outlined"><AlertIcon><CircleInfoIcon /></AlertIcon><AlertTitle>Outlined Alert</AlertTitle></Alert>
  <Alert variant="solid"><AlertIcon><CircleInfoIcon /></AlertIcon><AlertTitle>Solid Alert</AlertTitle></Alert>
</div>
