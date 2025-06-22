import * as vscode from 'vscode';
export function showWelcomePanel(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'onboardWelcome',
    '👋 Welcome, Frontend Hero!',
    vscode.ViewColumn.One,
    {}
  );

  panel.webview.html = `
    <html>
    <body style="font-family: sans-serif; padding: 20px;">
      <h1>🚀 Let's get you setup, JavaScript Jedi</h1>
      <p>We've got your Prettier, ESLint, and all the Reacty goodies.</p>
      <img src="https://media.giphy.com/media/XIqCQx02E1U9W/giphy.gif" width="300"/>
      <p>Type <b>Cmd+Shift+P</b> and run <code>Onboard Me, Senpai!</code></p>
      <p style="color:gray;">(You’re now 5% more employable)</p>
    </body>
    </html>
  `;
}
