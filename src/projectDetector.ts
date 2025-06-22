// src/projectDetector.ts
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { installExtensions } from './extensions';
import { FRAMEWORK_BUNDLES } from './frameworkBundles';

export async function detectProjectType() {
  const folder = vscode.workspace.workspaceFolders?.[0];
  if (!folder) {
    vscode.window.showErrorMessage('❌ No workspace folder open.');
    return;
  }

  const pkgPath = path.join(folder.uri.fsPath, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    vscode.window.showWarningMessage('🤷‍♂️ No package.json found.');
    return;
  }

  const { dependencies = {}, devDependencies = {} } = JSON.parse(
    fs.readFileSync(pkgPath, 'utf8')
  );
  const deps = { ...dependencies, ...devDependencies };

  const stackLabels: string[] = [];
  const bundles: string[] = [];

  if ('typescript' in deps) stackLabels.push('TypeScript 🟦');
  if ('react' in deps) {
    stackLabels.push('React ⚛️');
    bundles.push(...FRAMEWORK_BUNDLES.react);
  }
  if ('next' in deps) {
    stackLabels.push('Next.js 🧪');
    bundles.push(...FRAMEWORK_BUNDLES.next);
  }
  if ('vue' in deps) {
    stackLabels.push('Vue 🍃');
    bundles.push(...FRAMEWORK_BUNDLES.vue);
  }
  if ('svelte' in deps) {
    stackLabels.push('Svelte 🔥');
    bundles.push(...FRAMEWORK_BUNDLES.svelte);
  }

  if (stackLabels.length === 0) {
    vscode.window.showInformationMessage(
      "🤷 Couldn't detect a familiar framework. Mystery project, huh?"
    );
    return;
  }

  /** remove duplicates, merge with core essentials  */
  const unique = Array.from(new Set(bundles));
  await installExtensions(unique);

  vscode.window.showInformationMessage(
    `🚀 Detected: ${stackLabels.join(', ')} — installed ${
      unique.length
    } helpful extensions for you!`
  );
}
