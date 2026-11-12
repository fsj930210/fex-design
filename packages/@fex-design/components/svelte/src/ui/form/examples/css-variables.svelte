<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { Form, FormField } from "@fex-design/svelte/ui/form";
  import { Input } from "@fex-design/svelte/ui/input";
  import { Button } from "@fex-design/svelte/ui/button";

  const presets = {
    compact: {
      "--form-gap": "12px",
      "--form-item-gap": "4px",
      "--form-label-color": "#0f766e",
      "--form-description-color": "#475569",
      "--form-error-color": "#b91c1c",
    },
    spacious: {
      "--form-gap": "24px",
      "--form-item-gap": "10px",
      "--form-label-color": "#4338ca",
      "--form-description-color": "#6d28d9",
      "--form-error-color": "#be123c",
    },
  };
  const requiredText = ({ value }: { value: unknown }) =>
    String(value).trim() ? undefined : "请填写此项";
  let spacious = $state(false);
  let result = $state("");
  const form = createForm(() => ({
    defaultValues: { project: "", owner: "" },
    onSubmit: ({ value }) => {
      result = "已保存项目：" + value.project;
    },
  }));
</script>

<section
  class="mx-auto grid w-full max-w-xl gap-5 p-5"
  style={Object.entries(presets[spacious ? "spacious" : "compact"])
    .map(([name, value]) => name + ":" + value)
    .join(";")}
>
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">通过 CSS 变量定制表单</h3>
    <p class="text-sm text-muted-foreground">
      切换两组局部变量，观察字段间距、内部间距及标签、说明、错误颜色。变量由业务容器继承到
      Form，不修改控件的数据绑定。
    </p>
  </header>
  <div class="flex items-center gap-3">
    <Button
      type="button"
      onclick={() => {
        spacious = !spacious;
      }}>切换为{spacious ? "紧凑" : "宽松"}变量</Button
    ><span>当前配置：{spacious ? "宽松" : "紧凑"}</span>
  </div>
  <Form {form}>
    <FormField
      name="project"
      label="项目名称"
      description="字段之间的距离由 --form-gap 控制。"
      required
      validators={{ onChange: requiredText }}
      >{#snippet children(field)}<Input
          value={field.state.value}
          oninput={(event) => field.handleChange(event.currentTarget.value)}
          onblur={() => field.handleBlur()}
        />{/snippet}</FormField
    >
    <FormField
      name="owner"
      label="负责人"
      description="标签、控件与反馈之间由 --form-item-gap 控制。"
      required
      validators={{ onChange: requiredText }}
      >{#snippet children(field)}<Input
          value={field.state.value}
          oninput={(event) => field.handleChange(event.currentTarget.value)}
          onblur={() => field.handleBlur()}
        />{/snippet}</FormField
    >
    <Button type="submit" variant="solid" color="primary">保存项目</Button>
  </Form>
  <pre
    class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{JSON.stringify(
      presets[spacious ? "spacious" : "compact"],
      null,
      2,
    )}</pre>
  <p role="status" class="text-sm text-muted-foreground">{result}</p>
</section>
