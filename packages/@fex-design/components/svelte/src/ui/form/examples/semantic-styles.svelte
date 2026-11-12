<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { Form, FormField } from "@fex-design/svelte/ui/form";
  import { Input } from "@fex-design/svelte/ui/input";
  import { Button } from "@fex-design/svelte/ui/button";

  const partClasses = {
    root: "rounded-xl border border-dashed p-4",
    field: "rounded-lg border p-3",
    label: "font-semibold",
    description: "text-xs",
    error: "rounded-md px-2 py-1 font-medium",
  };
  const partStyles = {
    root: "border-color:#64748b",
    field: "border-color:#a5b4fc",
    label: "color:#4338ca",
    description: "color:#475569",
    error: "color:#b91c1c;background-color:#fee2e2",
  };
  const titleRule = ({ value }: { value: unknown }) =>
    String(value).trim().length >= 5 ? undefined : "标题至少需要 5 个字符";
  let customized = $state(true);
  let result = $state("");
  const form = createForm(() => ({
    defaultValues: { title: "" },
    onSubmit: ({ value }) => {
      result = "已提交：" + value.title;
    },
  }));
</script>

<section class="mx-auto grid w-full max-w-xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">定制表单语义部件</h3>
    <p class="text-sm text-muted-foreground">
      切换默认与定制样式，分别调整根容器、字段、标签、说明和错误。UI 使用
      classNames/styles，Primitive 直接定制对应部件。
    </p>
  </header>
  <Button
    type="button"
    onclick={() => {
      customized = !customized;
    }}>{customized ? "恢复默认样式" : "应用语义样式"}</Button
  >
  <Form
    {form}
    classNames={customized ? partClasses : undefined}
    styles={customized ? partStyles : undefined}
  >
    <FormField
      name="title"
      label="申请标题"
      description="至少填写 5 个字符，提交后观察错误部件的独立样式。"
      required
      validators={{ onChange: titleRule }}
      classNames={customized ? partClasses : undefined}
      styles={customized ? partStyles : undefined}
      >{#snippet children(field)}<Input
          value={field.state.value}
          oninput={(event) => field.handleChange(event.currentTarget.value)}
          onblur={() => field.handleBlur()}
        />{/snippet}</FormField
    >
    <Button type="submit" variant="solid" color="primary">提交申请</Button>
  </Form>
  <p role="status" class="text-sm text-muted-foreground">{result}</p>
</section>
