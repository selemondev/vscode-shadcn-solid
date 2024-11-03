import { commands, window, env, Uri } from "vscode";
import type { ExtensionContext, Disposable } from "vscode";

import {
  getInitCmd,
  getInstallCmd,
  getComponentDocLink,
  getRegistry,
} from "./utils/registry";
import { executeCommand } from "./utils/vscode";
import type { Components } from "./utils/registry";
import { getLocalStorageValue } from "./utils/getLocalStorageValue";
import { LocalStorageService } from "./utils/localStorageService";

const extCommands = {
  initCli: "shadcn-solid.initCli",
  addNewComponent: "shadcn-solid.addNewComponent",
  addMultipleComponents: "shadcn-solid.addMultipleComponents",
  gotoComponentDoc: "shadcn-solid.gotoComponentDoc",
  reloadComponentList: "shadcn-solid.reloadComponentList",
  selectUIFramework: "shadcn-solid.select-ui-framework",
  gotoDoc: "shadcn-solid.gotoDoc",
} as const; 

export function activate(context: ExtensionContext) {
  let registryData: Components;

  const localStorageVal = getLocalStorageValue(context.globalState);

  const disposables: Disposable[] = [
    commands.registerCommand(extCommands.initCli, async () => {
      const intCmd = await getInitCmd(localStorageVal);
      executeCommand(intCmd);
    }),
    commands.registerCommand(extCommands.addNewComponent, async () => {
      if (!registryData) {
        const newRegistryData = await getRegistry(localStorageVal);

        if (!newRegistryData) {
          window.showErrorMessage("Can not get the component list");
          return;
        }

        registryData = newRegistryData;
      }

      const selectedComponent = await window.showQuickPick(registryData, {
        matchOnDescription: true,
      });

      if (!selectedComponent) {
        return;
      }

      const installCmd = await getInstallCmd([selectedComponent.label], localStorageVal);
      executeCommand(installCmd);
    }),

    commands.registerCommand(extCommands.addMultipleComponents, async () => {
      if (!registryData) {
        const newRegistryData = await getRegistry(localStorageVal);

        if (!newRegistryData) {
          window.showErrorMessage("Can not get the component list");
          return;
        }

        registryData = newRegistryData;
      }

      const selectedComponents = await window.showQuickPick(registryData, {
        matchOnDescription: true,
        canPickMany: true,
      });

      if (!selectedComponents) {
        return;
      }

      const selectedComponent = selectedComponents.map((component) => component.label);

      const installCmd = await getInstallCmd(selectedComponent, localStorageVal);
      executeCommand(installCmd);
    }),
    commands.registerCommand(extCommands.gotoComponentDoc, async () => {
      if (!registryData) {
        const newRegistryData = await getRegistry(localStorageVal);

        if (!newRegistryData) {
          window.showErrorMessage("Can not get the component list");
          return;
        }

        registryData = newRegistryData;
      }

      const selectedComponent = await window.showQuickPick(registryData, {
        matchOnDescription: true,
      });

      if (!selectedComponent) {
        return;
      }

      const componentDocLink = getComponentDocLink(selectedComponent.label, localStorageVal);
      env.openExternal(Uri.parse(componentDocLink));
    }),
    commands.registerCommand(extCommands.reloadComponentList, async () => {
      const newRegistryData = await getRegistry(localStorageVal);

      if (!newRegistryData) {
        window.showErrorMessage("Can not get the component list");
        return;
      }

      registryData = newRegistryData;
      window.showInformationMessage("shadcn/solid: Reloaded components");
    }),
    commands.registerCommand(extCommands.gotoDoc, async () => {
      const shadCnDocUrl = localStorageVal === "solid-ui" ? "https://solid-ui-components.vercel.app/docs" : 'https://shadcn-solid.com/docs';
      env.openExternal(Uri.parse(shadCnDocUrl));
    }),

    commands.registerCommand(extCommands.selectUIFramework, async () => {
      let storageManager = new LocalStorageService(context.globalState);
      const uiFrameworks = ['shadcn-solid', 'solid-ui'];
      const selectedUIFramework = await window.showQuickPick(uiFrameworks);
      if (!selectedUIFramework) {return;}
      window.showInformationMessage(selectedUIFramework);
      storageManager.setValue<string>('selectedUIFramework', selectedUIFramework);
      await commands.executeCommand('workbench.action.reloadWindow');
    }),
  ];

  context.subscriptions.push(...disposables);
}

// This method is called when your extension is deactivated
export function deactivate() { }
