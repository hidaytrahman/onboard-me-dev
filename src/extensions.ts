import * as vscode from 'vscode';

/** core “must-have” tools for EVERY JS/TS project */
export const CORE_ESSENTIALS = [
  'esbenp.prettier-vscode',
  'dbaeumer.vscode-eslint',
  'naumovs.color-highlight',
  'usernamehw.errorlens',
  'aaron-bond.better-comments',
  'alefragnani.Bookmarks',
  'Cardinal90.multi-cursor-case-preserve',
  'streetsidesoftware/vscode-spell-checker',
];

/** install ANY list of VS Code extensions */
export async function installExtensions(ids: string[]) {
  const missing = ids.filter((id) => !vscode.extensions.getExtension(id));
  if (missing.length === 0) return;

  for (const id of missing) {
    await vscode.commands.executeCommand(
      'workbench.extensions.installExtension',
      id
    );
  }
}

// export async function installExtensions() {
//   const extensions = [
//     'esbenp.prettier-vscode',
//     'dbaeumer.vscode-eslint',
//     'dsznajder.es7-react-js-snippets',
//     'naumovs.color-highlight',
//     'formulahendry.auto-close-tag',
//     'formulahendry.auto-rename-tag',
//   ];

//   for (const id of extensions) {
//     if (!vscode.extensions.getExtension(id)) {
//       await vscode.commands.executeCommand(
//         'workbench.extensions.installExtension',
//         id
//       );
//     }
//   }
// }

/** install core essentials */

/** old command handler still works */
export async function installEssentials() {
  await installExtensions(CORE_ESSENTIALS);
}
