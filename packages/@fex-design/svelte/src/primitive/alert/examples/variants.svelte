<script lang="ts">
  import AlertTitle from '../alert-title.svelte'
  import AlertIcon from '../alert-icon.svelte'
  import Alert from '../alert.svelte'
  import InfoIcon from '../../../icon/info.svelte'
</script>

<div class="grid w-full gap-3">
  <Alert variant="filled"><AlertIcon><InfoIcon /></AlertIcon><AlertTitle>Filled Alert</AlertTitle></Alert>
  <Alert variant="outlined"><AlertIcon><InfoIcon /></AlertIcon><AlertTitle>Outlined Alert</AlertTitle></Alert>
  <Alert variant="solid"><AlertIcon><InfoIcon /></AlertIcon><AlertTitle>Solid Alert</AlertTitle></Alert>
</div>
