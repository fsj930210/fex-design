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
    action = "已填入修改值，观察 isDirty 与 isDefaultValue";
  }
  function resetName() {
    form.setFieldValue("name", initialProfile.name);
    form.setFieldValue("email", initialProfile.email);
    action = "已改回初始值，编辑记录仍保留";
  }
  function resetAll() {
    form.reset();
    action = "已重置值与编辑状态";
  }
</script>

<section class="mx-auto grid w-full max-w-xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">编辑状态与初始值比较</h3>
    <p class="text-sm text-muted-foreground">
      isDirty 记录是否编辑过；isDefaultValue
      比较当前值与初始值。改回初始值不会清除编辑记录，重置状态会清除。
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
      <Button type="button" onclick={fillProfile}>填入修改值</Button>
      <Button type="button" onclick={resetName}>改回初始值</Button>
      <Button type="button" onclick={resetAll}>重置状态</Button>
    </div>
    <FormSubscribe
      selector={(state) => ({
        values: state.values,
        isDirty: state.isDirty,
        isDefaultValue: state.isDefaultValue,
        isTouched: state.isTouched,
      })}
    >
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
