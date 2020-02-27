# Developing for tremor-vscode

Make sure you have [node.js](https://nodejs.org/) installed. Then run (from the repo root):

```
npm install
```

You can symlink the repo to `~/.vscode/extensions/`, for picking up the extension changes in the repo.

To compile edited typescript files to javascript, run: `npm run compile` from the repository root.

If you are using VS Code itself for editing the extension files, you can skip the above and just press `F5` to debug the extension: this will run `npm watch` task in the background to compile the code, and launch the extension in a new VS Code window.

Helpful links:

* https://code.visualstudio.com/api/language-extensions/overview
* https://code.visualstudio.com/api/language-extensions/language-server-extension-guide
* https://code.visualstudio.com/api/references/vscode-api

The trace [configuration](README.md#configuration) options can be used to see communication between the VS code and the language server.


## Packaging

For distributing the extension outside of the marketplace (or for local testing), you can package it as below:

```sh
npm install -g vsce
vsce package
```

To install the package:

```sh
code --install-extension tremor-<version>.vsix
```
