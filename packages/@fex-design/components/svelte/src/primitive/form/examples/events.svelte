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
  import { RadioGroup, Radio } from "@fex-design/svelte/primitive/radio";
  import { Button } from "@fex-design/svelte/primitive/button";
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
  <FormRoot {form}>
    <FormField name="channel"
      >{#snippet children(field)}<FormLabel>通知渠道</FormLabel><FormControl
          ><RadioGroup
            value={field.state.value}
            onChange={(value) => changeChannel(String(value))}
            orientation="horizontal"
            >{#each channels as option (option.value)}<label
                class="inline-flex items-center gap-2"
                ><Radio value={option.value} />{option.label}</label
              >{/each}</RadioGroup
          ></FormControl
        >{/snippet}</FormField
    >
    <FormSubscribe selector={(state) => state.values.channel}
      >{#snippet children(channel)}
        <div class="grid gap-3">
          <FormField name="address"
            >{#snippet children(field)}<FormLabel>收件地址</FormLabel
              ><FormControl
                ><InputRoot
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  ><InputControl
                    onblur={() => {
                      field.handleBlur();
                      log = "收件地址已失焦：" + (field.state.value || "空");
                    }}
                    placeholder={channel === "email"
                      ? "请输入邮箱地址"
                      : "请输入手机号码"}
                  /></InputRoot
                ></FormControl
              >{/snippet}</FormField
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
  </FormRoot>
  <p role="status" class="text-sm text-muted-foreground">{log}</p>
</section>
