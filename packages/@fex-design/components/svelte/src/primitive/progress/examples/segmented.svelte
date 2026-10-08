<script lang="ts">
  import StepLineDemo from './_parts/step-line.svelte'
  import StepRingDemo from './_parts/step-ring.svelte'

</script>

<div class="grid w-full max-w-md gap-5">
  <div class="grid gap-3">
    <StepLineDemo active={3} value={50} />
    <StepLineDemo active={4} value={80} />
    <StepLineDemo active={5} value={100} />
  </div>
  <div class="flex items-center gap-6">
    <StepRingDemo value={50} />
    <StepRingDemo value={80} />
    <StepRingDemo value={100} />
  </div>
</div>
