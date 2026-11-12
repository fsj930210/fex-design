<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { z } from "zod";
  import {
    FormRoot,
    FormField,
    FormLabel,
    FormControl,
    FormError,
  } from "@fex-design/svelte/primitive/form";
  import { InputRoot, InputControl } from "@fex-design/svelte/primitive/input";
  import { Button } from "@fex-design/svelte/primitive/button";
  const registrationSchema = z
    .object({
      email: z.email("请输入有效邮箱"),
      password: z.string().min(8, "密码至少需要 8 个字符"),
      confirmation: z.string().min(1, "请再次输入密码"),
    })
    .refine((value) => value.password === value.confirmation, {
      path: ["confirmation"],
      message: "两次输入的密码不一致",
    });
  let result = $state("");
  const form = createForm(() => ({
    defaultValues: { email: "", password: "", confirmation: "" },
    validators: { onChange: registrationSchema, onSubmit: registrationSchema },
    onSubmit: ({ value }) => {
      result = "注册校验通过：" + value.email;
    },
  }));
</script>

<section class="mx-auto grid w-full max-w-xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">使用 Zod 校验注册信息</h3>
    <p class="text-sm text-muted-foreground">
      对象 Schema 同时校验字段格式和两次密码一致性；确认密码错误归属到对应字段。
    </p>
  </header>
  <FormRoot {form}>
    <FormField name="email"
      >{#snippet children(field)}<FormLabel required>邮箱</FormLabel
        ><FormControl
          ><InputRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            ><InputControl
              type="email"
              onblur={() => field.handleBlur()}
            /></InputRoot
          ></FormControl
        ><FormError />{/snippet}</FormField
    >
    <FormField name="password"
      >{#snippet children(field)}<FormLabel required>密码</FormLabel
        ><FormControl
          ><InputRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            ><InputControl
              type="password"
              onblur={() => field.handleBlur()}
            /></InputRoot
          ></FormControl
        ><FormError />{/snippet}</FormField
    >
    <FormField name="confirmation"
      >{#snippet children(field)}<FormLabel required>确认密码</FormLabel
        ><FormControl
          ><InputRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            ><InputControl
              type="password"
              onblur={() => field.handleBlur()}
            /></InputRoot
          ></FormControl
        ><FormError />{/snippet}</FormField
    >
    <Button type="submit" variant="solid" color="primary">注册</Button>
  </FormRoot>
  {#if result}<p
      role="status"
      class="rounded-md bg-muted-background p-3 text-sm"
    >
      {result}
    </p>{/if}
</section>
