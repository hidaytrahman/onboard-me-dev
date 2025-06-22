import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export async function detectProjectType() {
  const folders = vscode.workspace.workspaceFolders;

  if (!folders || folders.length === 0) {
    vscode.window.showErrorMessage(
      "❌ No workspace folder open. Please open a project folder."
    );
    return;
  }

  const projectPath = folders[0].uri.fsPath;
  const pkgPath = path.join(projectPath, "package.json");
  const tsconfigPath = path.join(projectPath, "tsconfig.json");

  if (!fs.existsSync(pkgPath)) {
    vscode.window.showWarningMessage(
      "🤷‍♂️ No package.json found. Can't detect project type."
    );
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  const typescript = fs.existsSync(tsconfigPath) || "typescript" in deps;
  const isReact = "react" in deps;
  const isNext = "next" in deps;
  const isVue = "vue" in deps;
  const isSvelte = "svelte" in deps;
  const isVite = "vite" in deps;
  const isCRA = "react-scripts" in deps;

  const stack = [
    typescript ? "TypeScript 🟦" : "JavaScript 🟨",
    isReact ? "React ⚛️" : "",
    isNext ? "Next.js 🧪" : "",
    isVue ? "Vue 🍃" : "",
    isSvelte ? "Svelte 🔥" : "",
    isCRA ? "Create React App 🛠️" : "",
    isVite ? "Vite ⚡" : "",
  ].filter(Boolean);

  if (stack.length === 0) {
    vscode.window.showInformationMessage(
      "🤷 Couldn't detect any known frontend frameworks. You do you, mysterious dev."
    );
  } else {
    vscode.window.showInformationMessage(
      `🚀 Looks like you're using: ${stack.join(
        ", "
      )}. You're cooking something good 👨‍🍳`
    );
  }
}
