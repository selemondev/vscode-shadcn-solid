<p align="center">
 <img align="center" src="https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/images/logo.png" height="96" />
 <h1 align="center">
  shadcn-solid
 </h1>
</p>

This VSCode extension enables you to install [shadcn/solid](https://solid-ui-components.vercel.app) components directly from your IDE ✨.

## Initialize the Shadcn/Solid CLI

![to initialize CLI open the command palette and search for shadcn/solid: install cli command](https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/assets/images/init-cli.png)

## Install components

![to initialize CLI open the command palette and search for shadcn/solid: add new component](https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/assets/images/add-new-component.png)

## Choose a component to install from the list

![choose a component to install from the list](https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/assets/images/add-new-component-preview.png)

## Install multiple components

![install multiple components](https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/assets/images/add-multiple-components.png)

## Choose components to install from the list
![choose components to install from the list](https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/assets/images/add-multiple-components-preview.png)

## Open the Shadcn-solid documentation

![open the shadcn-solid documentation](https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/assets/images/shadcn-solid-docs.png)

## Navigate to a particular component's documentation page

![navigate to a particular component's documentation page](https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/assets/images/shadcn-solid-component-docs.png)

## Choose a UI framework
![choose a ui framework of your choice](https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/assets/images/choose-ui-framework.png)

![choose a ui framework of your choice](https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/assets/images/ui-framework.png)


## Shadcn/solid Snippets

Easily import and use shadcn-solid components with ease using snippets within VSCode. Just type `cn` or `shadcn` in your solid file and choose from an array of components to use.

![shadcn-solid-snippets-example](https://raw.githubusercontent.com/selemondev/vscode-shadcn-solid/master/src/assets/images/shadcn-solid-import.png)

### How it works

| Snippet           | Description                            |
| ----------------- | -------------------------------------- |
| `cn-help`         | How to use shadcn/solid snippets       |
| `cns-help`         | How to use solid ui snippets       |
| `cni-[component]` | Adds imports for the component ( Shadcn Solid )         |
| `solid-ui-i-[component]` | Adds imports for the component ( Solid UI )   |
| `cnx-[component]` | Adds the markup for the component (Shadcn Solid ) |
| `solid-ui-x-[component]` | Adds the markup for the component (Solid UI ) |

### How to use?

1. Components

For `Alert` component, type `cni-alert` to add imports in your Solid file, and to use the component, use `cnx-alert`.

> Similarly, for any other component, use `cni-[component]` to add imports and `cnx-[component]` to use.

```tsx
// cni-alert - Shadcn Solid
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

// solid-ui-i-alert - Solid UI
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

// cnx-alert - Shadcn Solid
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>

// solid-ui-x-alert - Solid UI
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>
```

### How to contribute?

Contributions are welcome and encouraged! If you have any ideas or suggestions for new features, or if you encounter any bugs or issues, please open an issue or submit a pull request on the GitHub repository. 

Developers interested in contributing should read the [Code of Conduct](./CODE_OF_CONDUCT.md) and the [Contributing Guide](./CONTRIBUTING.md).

Use this link - [Snippet Generation](https://snippet-generator.app/?description=https%3A%2F%2Fsolid-ui-components.vercel.app%2Fdocs%2Fcomponents&tabtrigger=shadcn-&snippet=&mode=vscode) to generate snippets and add/update them to the `snippets` folder that is located in the `src` accordingly.


### Credits 

All credits go to the creators of these amazing projects:

- [Shadcn UI](https://ui.shadcn.com) for creating this beautiful project.
- [Shadcn solid](https://solid-ui-components.vercel.app/) for creating the Solid port of Shadcn UI.
- [Kobalte](https://kobalte.dev/docs/core/overview/introduction) for doing all the hard work to make sure components are accessible.
