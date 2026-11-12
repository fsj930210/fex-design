<script lang="ts">
  import { z } from "zod";

  import { createForm } from "@tanstack/svelte-form";
  import {
    FormRoot,
    FormField,
    FormLabel,
    FormControl,
    FormError,
    FormSubscribe,
  } from "@fex-design/svelte/primitive/form";
  import { InputRoot, InputControl } from "@fex-design/svelte/primitive/input";
  import { Button } from "@fex-design/svelte/primitive/button";

  const initialValues = {
    groups: [
      {
        id: "group-1",
        name: "产品组",
        members: [
          {
            id: "member-1",
            name: "林晓",
            email: "lin@example.com",
            collectEmail: true,
          },
        ],
      },
    ],
  };
  const memberSchema = z
    .object({
      id: z.string(),
      name: z.string().trim().min(1, "请填写名称"),
      email: z.string(),
      collectEmail: z.boolean(),
    })
    .superRefine((member, context) => {
      if (
        member.collectEmail &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)
      )
        context.addIssue({
          code: "custom",
          path: ["email"],
          message: "请输入有效邮箱",
        });
    });
  const registrationSchema = z.object({
    groups: z.array(
      z.object({
        id: z.string(),
        name: z.string().trim().min(1, "请填写名称"),
        members: z.array(memberSchema),
      }),
    ),
  });
  let result = $state("");
  const form = createForm(() => ({
    defaultValues: initialValues,
    validators: { onChange: registrationSchema },
    onSubmit: ({ value }) => {
      result =
        "已保存 " +
        value.groups.length +
        " 个分组，" +
        value.groups.reduce((sum, group) => sum + group.members.length, 0) +
        " 位成员";
    },
  }));
  function copyGroup(index: number) {
    const group = form.getFieldValue("groups")[index];
    if (!group) return;
    form.pushFieldValue("groups", {
      ...group,
      id: crypto.randomUUID(),
      members: group.members.map((member) => ({
        ...member,
        id: crypto.randomUUID(),
      })),
    });
  }
  function toggleEmail(groupIndex: number, memberIndex: number) {
    const path =
      `groups[${groupIndex}].members[${memberIndex}].collectEmail` as const;
    form.setFieldValue(path, !form.getFieldValue(path));
  }
  function addGroup() {
    form.pushFieldValue("groups", {
      id: crypto.randomUUID(),
      name: "",
      members: [],
    });
  }
  function addMember(groupIndex: number) {
    form.pushFieldValue(`groups[${groupIndex}].members`, {
      id: crypto.randomUUID(),
      name: "",
      email: "",
      collectEmail: true,
    });
  }
  function removeGroup(groupIndex: number) {
    void form.removeFieldValue("groups", groupIndex);
  }
  function removeMember(groupIndex: number, memberIndex: number) {
    void form.removeFieldValue(`groups[${groupIndex}].members`, memberIndex);
  }
  function resetGroups() {
    form.reset();
    result = "";
  }
</script>

<section class="mx-auto grid w-full max-w-xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">复杂动态报名表</h3>
    <p class="text-sm text-muted-foreground">
      分组与成员可独立增删，也可复制整组。按成员切换是否收集邮箱，隐藏字段不参与校验；复制数据使用新的稳定
      ID。
    </p>
  </header>
  <FormRoot {form}>
    <FormSubscribe selector={(state) => state.values.groups}
      >{#snippet children(groups)}
        <div class="grid gap-4">
          {#each groups as group, groupIndex (group.id)}<section
              class="grid gap-4 rounded-lg bg-muted-background p-4"
              aria-label={`分组 ${groupIndex + 1}`}
            >
              <div class="flex items-center justify-between gap-3">
                <h4 class="font-semibold">分组 {groupIndex + 1}</h4>
                <Button
                  type="button"
                  onclick={() => removeGroup(groupIndex)}
                  aria-label={`删除分组 ${groupIndex + 1}`}>删除分组</Button
                ><Button type="button" onclick={() => copyGroup(groupIndex)}
                  >复制分组</Button
                >
              </div>
              <FormField name={`groups[${groupIndex}].name`}
                >{#snippet children(field)}<FormLabel required
                    >分组名称</FormLabel
                  ><FormControl
                    ><InputRoot
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      ><InputControl
                        onblur={() => field.handleBlur()}
                      /></InputRoot
                    ></FormControl
                  ><FormError />{/snippet}</FormField
              >
              {#each group.members as member, memberIndex (member.id)}<section
                  class="grid gap-3 rounded-md border border-border p-3"
                  aria-label={`成员 ${memberIndex + 1}`}
                >
                  <div class="flex items-center justify-between gap-3">
                    <h5 class="font-medium">成员 {memberIndex + 1}</h5>
                    <Button
                      type="button"
                      onclick={() => removeMember(groupIndex, memberIndex)}
                      aria-label={`删除成员 ${memberIndex + 1}`}
                      >删除成员</Button
                    >
                  </div>
                  <FormField
                    name={`groups[${groupIndex}].members[${memberIndex}].name`}
                    >{#snippet children(field)}<FormLabel required
                        >成员姓名</FormLabel
                      ><FormControl
                        ><InputRoot
                          value={field.state.value}
                          onChange={(value) => field.handleChange(value)}
                          ><InputControl
                            onblur={() => field.handleBlur()}
                          /></InputRoot
                        ></FormControl
                      ><FormError />{/snippet}</FormField
                  >
                  <Button
                    type="button"
                    onclick={() => toggleEmail(groupIndex, memberIndex)}
                    >{member.collectEmail ? "不收集邮箱" : "收集邮箱"}</Button
                  >
                  {#if member.collectEmail}
                    <FormField
                      name={`groups[${groupIndex}].members[${memberIndex}].email`}
                      >{#snippet children(field)}<FormLabel required
                          >成员邮箱</FormLabel
                        ><FormControl
                          ><InputRoot
                            value={field.state.value}
                            onChange={(value) => field.handleChange(value)}
                            ><InputControl
                              onblur={() => field.handleBlur()}
                            /></InputRoot
                          ></FormControl
                        ><FormError />{/snippet}</FormField
                    >{/if}
                </section>{/each}
              <Button
                type="button"
                onclick={() => addMember(groupIndex)}
                aria-label={`为分组 ${groupIndex + 1} 新增成员`}
                >新增成员</Button
              >
            </section>{/each}
        </div>
      {/snippet}</FormSubscribe
    >
    <div class="flex flex-wrap gap-3">
      <Button type="button" onclick={addGroup}>新增分组</Button><Button
        type="submit"
        variant="solid"
        color="primary">保存所有分组</Button
      ><Button type="button" onclick={resetGroups}>重置所有分组</Button>
    </div>
    <FormSubscribe selector={(state) => state.values}
      >{#snippet children(values)}<pre
          class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{JSON.stringify(
            values,
            null,
            2,
          )}</pre>{/snippet}</FormSubscribe
    >
  </FormRoot>
  <p role="status" class="text-sm text-muted-foreground">{result}</p>
</section>
