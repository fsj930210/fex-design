<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { Form, FormField } from "@fex-design/svelte/ui/form";
  import { Input } from "@fex-design/svelte/ui/input";
  import { Button } from "@fex-design/svelte/ui/button";
  let {
    layout,
    options,
  }: {
    layout: "vertical" | "horizontal" | "inline";
    options: {
      labelAlign: "start" | "end";
      labelWidth: string;
      labelGap: string;
      labelWrap: boolean;
    };
  } = $props();
  const titles = {
    vertical: "纵向布局",
    horizontal: "横向布局",
    inline: "行内布局",
  };
  const requiredText = ({ value }: { value: unknown }) =>
    String(value ?? "").trim() ? undefined : "请填写此项";
  let result = $state("");
  const form = createForm(() => ({
    defaultValues: { name: "", project: "", approval: "" },
    onSubmit: ({ value }) => {
      result = JSON.stringify(value);
    },
  }));
</script>

<section class="grid min-w-0 gap-3 rounded-lg border border-border p-4">
  <h4 class="text-sm font-semibold">{titles[layout]}</h4>
  <Form {form} {layout} {...options}>
    <FormField
      name="name"
      label="姓名"
      required
      validators={{ onBlur: requiredText, onSubmit: requiredText }}
      >{#snippet children(field)}<Input
          value={field.state.value}
          oninput={(event) => field.handleChange(event.currentTarget.value)}
          onblur={() => field.handleBlur()}
          placeholder="请输入姓名"
        />{/snippet}</FormField
    >
    <FormField
      name="project"
      label="项目名称"
      required
      validators={{ onBlur: requiredText, onSubmit: requiredText }}
      >{#snippet children(field)}<Input
          value={field.state.value}
          oninput={(event) => field.handleChange(event.currentTarget.value)}
          onblur={() => field.handleBlur()}
          placeholder="请输入项目名称"
        />{/snippet}</FormField
    >
    <FormField
      name="approval"
      label="项目审批负责人联系方式"
      required
      description="用于观察长标签换行后，说明和错误是否仍与控件对齐。"
      validators={{ onBlur: requiredText, onSubmit: requiredText }}
      >{#snippet children(field)}<Input
          value={field.state.value}
          oninput={(event) => field.handleChange(event.currentTarget.value)}
          onblur={() => field.handleBlur()}
          placeholder="请输入项目审批负责人联系方式"
        />{/snippet}</FormField
    >
    <div data-slot="form-actions" class="flex gap-2">
      <Button type="submit" variant="solid" color="primary">查询</Button><Button
        type="reset"
        onclick={() => (result = "")}>重置</Button
      >
    </div>
  </Form>
  {#if result}<p role="status" class="break-all text-sm text-muted-foreground">
      查询条件：{result}
    </p>{/if}
</section>
