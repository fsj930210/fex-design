import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgDir = path.resolve(__dirname, "../svg");
const buildScript = path.resolve(__dirname, "./build-icons.mjs");

function runBuild() {
  try {
    execSync(`node "${buildScript}"`, { stdio: "inherit" });
  } catch (err) {
    console.error("Failed to build icons:", err);
  }
}

// 首次运行一次全量构建
runBuild();

console.log(`Watching ${svgDir} for changes...`);

let timer = null;
fs.watch(svgDir, (eventType, filename) => {
  if (filename && filename.endsWith(".svg")) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log(`SVG changed (${eventType}: ${filename}), regenerating icons...`);
      runBuild();
    }, 100);
  }
});
