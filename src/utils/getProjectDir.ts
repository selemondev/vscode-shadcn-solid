import { workspace } from "vscode";

export const getProjectDir = async () => {
    const workspaceFolder = workspace.workspaceFolders?.[0].uri.fsPath;
    return workspaceFolder;
};
