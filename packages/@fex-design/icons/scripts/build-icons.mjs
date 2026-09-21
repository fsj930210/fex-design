import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgDir = path.resolve(__dirname, "../svg");
const componentsDir = path.resolve(__dirname, "../../components");

function toPascalCase(str) {
  return str
    .split("-")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function toCamelCaseAttr(attr) {
  return attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function transformSvgToJsx(svg) {
  let inTag = true;
  let tagEnd = svg.indexOf(">");
  let tagStr = svg.slice(0, tagEnd);
  let rest = svg.slice(tagEnd);

  tagStr = tagStr.replace(/([a-z0-9]+)-([a-z0-9]+)=/gi, (match, p1, p2) => {
    if (match.startsWith("aria-") || match.startsWith("data-")) {
      return match;
    }
    return toCamelCaseAttr(match);
  });

  tagStr = tagStr.replace(/class="[^"]*"/g, "");
  tagStr = tagStr.trimEnd() + " className={className} {...props}";
  return tagStr + rest;
}

function injectVueProps(svg) {
  return svg.replace(/class="[^"]*"/g, "");
}

function injectSolidProps(svg) {
  let tagEnd = svg.indexOf(">");
  let tagStr = svg.slice(0, tagEnd).replace(/class="[^"]*"/g, "").trimEnd();
  return tagStr + " {...props}" + svg.slice(tagEnd);
}

function injectSvelteProps(svg) {
  let tagEnd = svg.indexOf(">");
  let tagStr = svg.slice(0, tagEnd).replace(/class="[^"]*"/g, "").trimEnd();
  return tagStr + " {...props}" + svg.slice(tagEnd);
}

const svgFiles = fs.readdirSync(svgDir).filter(f => f.endsWith(".svg"));

for (const file of svgFiles) {
  const baseName = file.replace(/\.svg$/, "");
  const componentName = `${toPascalCase(baseName)}Icon`;
  const rawSvg = fs.readFileSync(path.join(svgDir, file), "utf8").trim();

  // 1. React
  const reactPath = path.join(componentsDir, "react/src/icons", `${baseName}.tsx`);
  const reactCode = `import type { SVGProps } from "react";\n\nexport function ${componentName}({ className, ...props }: SVGProps<SVGSVGElement>) {\n  return (\n    ${transformSvgToJsx(rawSvg)}\n  );\n}\n`;
  fs.mkdirSync(path.dirname(reactPath), { recursive: true });
  fs.writeFileSync(reactPath, reactCode);

  // 2. Vue
  const vuePath = path.join(componentsDir, "vue/src/icons", `${baseName}-icon.vue`);
  const vueTsPath = path.join(componentsDir, "vue/src/icons", `${baseName}.ts`);
  const vueCode = `<script setup lang="ts">\ndefineOptions({ name: "${componentName}" });\n</script>\n<template>\n  ${injectVueProps(rawSvg)}\n</template>\n`;
  fs.mkdirSync(path.dirname(vuePath), { recursive: true });
  fs.writeFileSync(vuePath, vueCode);
  fs.writeFileSync(vueTsPath, `export { default as ${componentName} } from './${baseName}-icon.vue'\n`);

  // 3. Solid
  const solidPath = path.join(componentsDir, "solid/src/icons", `${baseName}.tsx`);
  const solidCode = `import type { JSX } from "solid-js";\n\nexport function ${componentName}(props: JSX.SvgSVGAttributes<SVGSVGElement>) {\n  return (\n    ${injectSolidProps(rawSvg)}\n  );\n}\n`;
  fs.mkdirSync(path.dirname(solidPath), { recursive: true });
  fs.writeFileSync(solidPath, solidCode);

  // 4. Svelte
  const sveltePath = path.join(componentsDir, "svelte/src/icons", `${baseName}.svelte`);
  const svelteCode = `<script lang="ts">\n  import type { SVGAttributes } from "svelte/elements";\n  let { ...props }: SVGAttributes<SVGSVGElement> = $props();\n</script>\n\n${injectSvelteProps(rawSvg)}\n`;
  fs.mkdirSync(path.dirname(sveltePath), { recursive: true });
  fs.writeFileSync(sveltePath, svelteCode);

  // 5. Angular
  const angularHtmlPath = path.join(componentsDir, "angular/src/icons", `${baseName}.html`);
  const angularTsPath = path.join(componentsDir, "angular/src/icons", `${baseName}.ts`);
  fs.mkdirSync(path.dirname(angularHtmlPath), { recursive: true });
  fs.writeFileSync(angularHtmlPath, rawSvg + '\n');
  const angularCode = `import { ChangeDetectionStrategy, Component } from "@angular/core";\n\n@Component({\n  selector: "${baseName}-icon",\n  standalone: true,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  host: { class: "contents" },\n  templateUrl: "./${baseName}.html",\n})\nexport class ${componentName} {}\n`;
  fs.writeFileSync(angularTsPath, angularCode);
}

console.log(`Successfully generated ${svgFiles.length} icons for React, Vue, Solid, Svelte, and Angular in src/icons!`);
