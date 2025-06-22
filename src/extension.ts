import * as vscode from "vscode";
import { installExtensions } from "./extensions";
import { applySettings } from "./settings";
import { showWelcomePanel } from "./webview";
import { detectProjectType } from "./projectDetector";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("onboard.installEssentials", async () => {
      await installExtensions();
      applySettings();
      vscode.window.showInformationMessage(
        "✅ You're all set! Time to code like a rockstar 💻🎸"
      );
    }),

    vscode.commands.registerCommand("onboard.showWelcome", () => {
      showWelcomePanel(context);
    }),

    vscode.commands.registerCommand("onboard.tellJoke", () => {
      const jokes = [
        "Why did the React developer break up with their partner? Too many props. 😅",
        "Why don’t JS devs wear glasses? Because they don’t C#!",
        "How do you comfort a JavaScript bug? You console it. 😂",
      ];
      vscode.window.showInformationMessage(
        jokes[Math.floor(Math.random() * jokes.length)]
      );
    }),

    vscode.commands.registerCommand("onboard.detectProjectType", async () => {
      await detectProjectType();
    })
  );
}
