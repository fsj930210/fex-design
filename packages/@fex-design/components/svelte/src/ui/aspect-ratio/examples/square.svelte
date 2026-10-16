<script lang="ts">
  import { AspectRatio } from '@fex-design/svelte/ui/aspect-ratio'
  import image from "./aspect-ratio-demo.svg";
</script>

<AspectRatio ratio={1} class="max-w-64"
  ><img
    src={image}
    alt="Mountain landscape"
    class="size-full object-cover"
  /></AspectRatio
>
