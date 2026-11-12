<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { Form, FormField, FormSubscribe } from "@fex-design/svelte/ui/form";
  import { Input } from "@fex-design/svelte/ui/input";
  import { RadioGroup } from "@fex-design/svelte/ui/radio";
  import { Button } from "@fex-design/svelte/ui/button";
  const channels = [
    { value: "email", label: "邮件" },
    { value: "sms", label: "短信" },
  ];
  let log = $state("请选择通知渠道，然后填写收件地址");
  const form = createForm(() => ({
    defaultValues: { channel: "email", address: "" },
  }));
  function changeChannel(value: string) {
    form.setFieldValue("channel", value);
    form.setFieldValue("address", "");
    log = "已切换到" + (value === "email" ? "邮件" : "短信") + "并清空收件地址";
  }
  function fillAddress() {
    const value =
      form.state.values.channel === "email"
        ? "member@example.com"
        : "13800138000";
    form.setFieldValue("address", value);
    log = "已回填：" + value;
  }
</script>

<section class="mx-auto grid w-full max-w-xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">通知渠道与收件地址</h3>
    <p class="text-sm text-muted-foreground">
      切换渠道时在事件回调中清空地址；回填按钮根据当前渠道设置示例地址，失焦时记录当前输入。
    </p>
  </header>
  <Form {form}>
    <FormField name="channel" label="通知渠道"
      >{#snippet children(field)}<RadioGroup
          value={field.state.value}
          onChange={(value) => changeChannel(String(value))}
          orientation="horizontal"
          options={channels}
        />{/snippet}</FormField
    >
    <FormSubscribe selector={(state) => state.values.channel}
      >{#snippet children(channel)}
        <div class="grid gap-3">
          <FormField name="address" label="收件地址"
            >{#snippet children(field)}<Input
                value={field.state.value}
                oninput={(event) =>
                  field.handleChange(event.currentTarget.value)}
                onblur={() => {
                  field.handleBlur();
                  log = "收件地址已失焦：" + (field.state.value || "空");
                }}
                placeholder={channel === "email"
                  ? "请输入邮箱地址"
                  : "请输入手机号码"}
              />{/snippet}</FormField
          >
          <Button type="button" onclick={fillAddress}>回填当前渠道地址</Button>
        </div>
      {/snippet}</FormSubscribe
    >
    <FormSubscribe selector={(state) => state.values}
      >{#snippet children(values)}<pre
          class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{JSON.stringify(
            values,
            null,
            2,
          )}</pre>{/snippet}</FormSubscribe
    >
  </Form>
  <p role="status" class="text-sm text-muted-foreground">{log}</p>
</section>
