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

export type Components = Component[];

export const getRegistry = async (val: string ): Promise<Components | null> => {
  const reqUrl = val === "solid-ui" ? "https://solid-ui-components.vercel.app/registry/index.json" : "https://shadcn-solid.com/registry/index.json";
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

export const getInstallCmd = async (components: string[], val: string) => {
  const packageManager = await detectPackageManager();
  const componentStr = components.join(" ");

  if (packageManager === "bun") {
    return val === "solid-ui" ? `bunx solidui-cli@latest add ${componentStr}` : `bunx shadcn-solid@latest add ${componentStr}` ;
  }

  if (packageManager === "pnpm") {
    return val === "solid-ui" ? `pnpm dlx solidui-cli@latest add ${componentStr}` : `pnpm dlx shadcn-solid@latest add ${componentStr}`;
  }

  return val === "solid-ui" ? `npx solidui-cli@latest add ${componentStr}` : `npx shadcn-solid@latest add ${componentStr}`;
};

export const getInitCmd = async (val: string) => {
  const packageManager = await detectPackageManager();

  if (packageManager === "bun") {
    return val === "solid-ui" ? "bunx solidui-cli@latest init" : "bunx shadcn-solid@latest init";
  }

  if (packageManager === "pnpm") {
    return val === "solid-ui" ? "pnpm dlx solidui-cli@latest init" : "pnpm dlx shadcn-solid@latest init";
  }

  return val === "solid-ui" ? "npx solidui-cli@latest init" : "npx shadcn-solid@latest init";
};

export const getComponentDocLink = (component: string, val: string) => {
  const shadCnDocUrl = val === "solid-ui" ? "https://solid-ui-components.vercel.app/docs" : 'https://shadcn-solid.com/docs';
  return `${shadCnDocUrl}/components/${component}`;
};