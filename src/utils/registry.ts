import { ofetch } from "ofetch";
import { to } from "./index";
import { detectPackageManager } from "./vscode";

type OgComponent = {
  type: "components:ui";
  name: string;
  files: string[];
  dependencies?: string[];
  registryDependencies?: string[];
};

type Component = {
  label: string;
  detail?: string;
};

export const shadCnDocUrl = "https://solid-ui-components.vercel.app/docs";

export type Components = Component[];

export const getRegistry = async (): Promise<Components | null> => {
  const reqUrl = "https://solid-ui-components.vercel.app/registry/index.json";
  const [res, err] = await to(ofetch(reqUrl));

  if (err || !res) {
    return null;
  }

  const [data] = await to(res);

  if (!data) {
    return null;
  }

  const components: Components = (data as OgComponent[]).map((c) => {
    const component: Component = {
      label: c.name,
      detail: `dependencies: ${c.dependencies && c.dependencies.length > 0 ? c.dependencies.join(" ") : "no dependency"}`,
    };

    return component;
  });

  return components;
};

export const getInstallCmd = async (components: string[]) => {
  const packageManager = await detectPackageManager();
  const componentStr = components.join(" ");

  if (packageManager === "bun") {
    return `bunx solidui-cli@latest add ${componentStr}`;
  }

  if (packageManager === "pnpm") {
    return `pnpm dlx solidui-cli@latest add ${componentStr}`;
  }

  return `npx solidui-cli@latest add ${componentStr}`;
};

export const getInitCmd = async () => {
  const packageManager = await detectPackageManager();

  if (packageManager === "bun") {
    return "bunx solidui-cli@latest init";
  }

  if (packageManager === "pnpm") {
    return "pnpm dlx solidui-cli@latest init";
  }

  return "npx solidui-cli@latest init";
};

export const getComponentDocLink = (component: string) => {
  return `${shadCnDocUrl}/components/${component}`;
};