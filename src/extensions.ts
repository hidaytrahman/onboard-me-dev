import * as vscode from 'vscode';

export async function installExtensions() {
  const extensions = [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "dsznajder.es7-react-js-snippets",
    "naumovs.color-highlight",
    "formulahendry.auto-close-tag",
    "formulahendry.auto-rename-tag",
  ];

  for (const id of extensions) {
    if (!vscode.extensions.getExtension(id)) {
      await vscode.commands.executeCommand(
        "workbench.extensions.installExtension",
        id
      );
    }
  }
}
