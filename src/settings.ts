import * as vscode from 'vscode';

export function applySettings() {
  const config = vscode.workspace.getConfiguration();

  config.update('editor.formatOnSave', true, vscode.ConfigurationTarget.Global);
  config.update('files.autoSave', 'onWindowChange', vscode.ConfigurationTarget.Global);
  config.update('javascript.updateImportsOnFileMove.enabled', 'always', vscode.ConfigurationTarget.Global);
  config.update('prettier.singleQuote', true, vscode.ConfigurationTarget.Global);
}
