<script lang="ts">
  import { qrcodeBackgroundClassName } from "@fex-design/components-styles/qrcode";
  import { cn } from "@fex-design/utils";
  import type { SVGAttributes } from "svelte/elements";
  import { useQrCode } from "./context";

  interface Props extends Omit<SVGAttributes<SVGRectElement>, "class"> {
    class?: string;
  }

  let { class: className, ...rest }: Props = $props();
  const { getModel } = useQrCode("QrCodeBackground");
  const model = $derived(getModel());
  const classList = $derived(cn(qrcodeBackgroundClassName, className));
</script>

<rect
  {...rest}
  data-slot="qrcode-background"
  class={classList}
  width={model.viewBoxSize}
  height={model.viewBoxSize}
/>
