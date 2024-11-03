import { window } from "vscode";
import { readPackageJSON } from "pkg-types";
import { existsSync } from "fs";
import { getProjectDir } from "./getProjectDir";


type Dependency = {
    name: string,
    version: number
};

export const getProjectDependencies = async (): Promise<Dependency[]> => {
    const dependencies: Dependency[] = [];
    const packageJsonPath = `${getProjectDir()}/package.json`;

    if(!existsSync(packageJsonPath)) {
        window.showErrorMessage("Cannot find package.json!");
        return [];
    } else {
        const packageJSON = await readPackageJSON(packageJsonPath);

        const addDependencies = (depsObj: Record<string, string> | undefined) => {
            if(depsObj) {
               dependencies.push(
                ...Object.keys(depsObj).map((key) => ({
                    name: key,
                    version: parseInt(depsObj[key].replace(/[\^~]/g, '')), // Use 'g' flag to replace all occurrences
                }))
               );
            }
        };
        addDependencies(packageJSON?.devDependencies);

        return dependencies;
    }
};
