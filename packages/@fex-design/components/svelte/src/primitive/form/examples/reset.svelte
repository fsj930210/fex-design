<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import {
    FormRoot,
    FormField,
    FormLabel,
    FormControl,
    FormSubscribe,
  } from "@fex-design/svelte/primitive/form";
  import { InputRoot, InputControl } from "@fex-design/svelte/primitive/input";
  import { Button } from "@fex-design/svelte/primitive/button";
  const initialProfile = { name: "林晓", email: "lin@example.com" };
  const loadedProfile = { name: "陈晨", email: "chen@example.com" };
  let action = $state("当前为初始化资料");
  const form = createForm(() => ({ defaultValues: initialProfile }));
  function fillProfile() {
    form.setFieldValue("name", loadedProfile.name);
    form.setFieldValue("email", loadedProfile.email);
    action = "已回填陈晨的资料，初始化值仍为林晓";
  }
  function resetName() {
    form.resetField("name");
    action = "已重置姓名，邮箱保持当前值";
  }
  function resetAll() {
    form.reset();
    action = "已恢复全部初始化资料";
  }
</script>

<section class="mx-auto grid w-full max-w-xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">资料回填与重置</h3>
    <p class="text-sm text-muted-foreground">
      回填只修改当前值；重置姓名只恢复姓名，重置全部恢复初始化资料和字段状态。
    </p>
  </header>
  <FormRoot {form}>
    <FormField name="name"
      >{#snippet children(field)}<FormLabel>姓名</FormLabel><FormControl
          ><InputRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            ><InputControl onblur={() => field.handleBlur()} /></InputRoot
          ></FormControl
        >{/snippet}</FormField
    >
    <FormField name="email"
      >{#snippet children(field)}<FormLabel>邮箱</FormLabel><FormControl
          ><InputRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            ><InputControl onblur={() => field.handleBlur()} /></InputRoot
          ></FormControl
        >{/snippet}</FormField
    >
    <div class="flex flex-wrap gap-3">
      <Button type="button" onclick={fillProfile}>回填资料</Button>
      <Button type="button" onclick={resetName}>仅重置姓名</Button>
      <Button type="button" onclick={resetAll}>重置全部</Button>
    </div>
    <FormSubscribe selector={(state) => state.values}>
      {#snippet children(values)}<pre
          class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{JSON.stringify(
            values,
            null,
            2,
          )}</pre>{/snippet}
    </FormSubscribe>
  </FormRoot>
  <p role="status" class="text-sm text-muted-foreground">{action}</p>
</section>
