<script lang="ts">
  import { Button } from "@fex-design/svelte/ui/button";
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  let open = $state(false);
  let innerOpen = $state(false);
</script>

<Button
  onclick={() => {
    open = true;
  }}>打开外层弹窗</Button
><Dialog bind:open title="外层弹窗"
  ><p>外层内容会保留。</p>
  <Button
    onclick={() => {
      innerOpen = true;
    }}>打开内层弹窗</Button
  ><Dialog bind:open={innerOpen} title="内层弹窗"
    ><p>关闭此弹窗后，外层弹窗仍然保留。</p>
    {#snippet footer()}<Button
        onclick={() => {
          innerOpen = false;
        }}>关闭内层</Button
      >{/snippet}</Dialog
  >{#snippet footer()}<Button
      onclick={() => {
        open = false;
      }}>关闭外层</Button
    >{/snippet}</Dialog
>
