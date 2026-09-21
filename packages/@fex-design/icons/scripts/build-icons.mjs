import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

function transformSvgToJsx(svgContent) {
  return svgContent.replace(/<svg([\s\S]*?)>/, (match, attrs) => {
    let convertedAttrs = attrs.replace(/([a-z0-9]+)-([a-z0-9]+)=/gi, (_, p1, p2) => {
      const full = `${p1}-${p2}`;
      return `${toCamelCaseAttr(full)}=`;
    });
    return `<svg${convertedAttrs} className={className} {...props}>`;
  });
}

function injectSolidProps(svgContent) {
  return svgContent.replace(/<svg([\s\S]*?)>/, (match, attrs) => {
    return `<svg${attrs} {...props}>`;
  });
}

function injectSvelteProps(svgContent) {
  return svgContent.replace(/<svg([\s\S]*?)>/, (match, attrs) => {
    return `<svg${attrs} {...props}>`;
  });
}

const svgFiles = fs.readdirSync(svgDir).filter(f => f.endsWith(".svg"));

for (const file of svgFiles) {
  const baseName = file.replace(/\.svg$/, "");
  const componentName = toPascalCase(baseName) + "Icon";
  const rawSvg = fs.readFileSync(path.join(svgDir, file), "utf8").trim();

  // 1. React
  const reactPath = path.join(componentsDir, "react/icons/src", `${baseName}.tsx`);
  const reactCode = `import type { SVGProps } from "react";\n\nexport function ${componentName}({ className, ...props }: SVGProps<SVGSVGElement>) {\n  return (\n    ${transformSvgToJsx(rawSvg)}\n  );\n}\n`;
  fs.mkdirSync(path.dirname(reactPath), { recursive: true });
  if (!fs.existsSync(reactPath) || fs.readFileSync(reactPath, 'utf8') !== reactCode) fs.writeFileSync(reactPath, reactCode);

  // 2. Vue
  const vuePath = path.join(componentsDir, "vue/icons/src", `${baseName}-icon.vue`);
  const vueCode = `<script setup lang="ts">\ndefineOptions({ name: "${componentName}" });\n</script>\n<template>\n  ${rawSvg}\n</template>\n`;
  fs.mkdirSync(path.dirname(vuePath), { recursive: true });
  if (!fs.existsSync(vuePath) || fs.readFileSync(vuePath, 'utf8') !== vueCode) fs.writeFileSync(vuePath, vueCode);

  // 3. Solid
  const solidPath = path.join(componentsDir, "solid/icons/src", `${baseName}.tsx`);
  const solidCode = `import type { JSX } from "solid-js";\n\nexport function ${componentName}(props: JSX.SvgSVGAttributes<SVGSVGElement>) {\n  return (\n    ${injectSolidProps(rawSvg)}\n  );\n}\n`;
  fs.mkdirSync(path.dirname(solidPath), { recursive: true });
  if (!fs.existsSync(solidPath) || fs.readFileSync(solidPath, 'utf8') !== solidCode) fs.writeFileSync(solidPath, solidCode);

  // 4. Svelte
  const sveltePath = path.join(componentsDir, "svelte/icons/src", `${baseName}.svelte`);
  const svelteCode = `<script lang="ts">\n  import type { SVGAttributes } from "svelte/elements";\n  let { ...props }: SVGAttributes<SVGSVGElement> = $props();\n</script>\n\n${injectSvelteProps(rawSvg)}\n`;
  fs.mkdirSync(path.dirname(sveltePath), { recursive: true });
  if (!fs.existsSync(sveltePath) || fs.readFileSync(sveltePath, 'utf8') !== svelteCode) fs.writeFileSync(sveltePath, svelteCode);

  // 5. Angular
  const angularHtmlPath = path.join(componentsDir, "angular/icons/src", `${baseName}.html`);
  const angularTsPath = path.join(componentsDir, "angular/icons/src", `${baseName}.ts`);
  fs.mkdirSync(path.dirname(angularHtmlPath), { recursive: true });
  if (!fs.existsSync(angularHtmlPath) || fs.readFileSync(angularHtmlPath, 'utf8') !== (rawSvg + '\n')) fs.writeFileSync(angularHtmlPath, rawSvg + '\n');
  const angularCode = `import { ChangeDetectionStrategy, Component } from "@angular/core";\n\n@Component({\n  selector: "${baseName}-icon",\n  standalone: true,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: "./${baseName}.html",\n})\nexport class ${componentName} {}\n`;
  if (!fs.existsSync(angularTsPath) || fs.readFileSync(angularTsPath, 'utf8') !== angularCode) fs.writeFileSync(angularTsPath, angularCode);
}

console.log(`Successfully generated ${svgFiles.length} icons for React, Vue, Solid, Svelte, and Angular!`);

