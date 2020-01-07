# tremor-vscode

Visual Studio Code extension for tremor.

## Installation

```bash
npm install

sudo npm install -g vsce
vsce package

code --install-extension tremor-<version>.vsix
```

## Configuration

```json
    "tremor.languageServerExecutable": "~/.cargo/bin/tremor-language-server"
    "tremor-script.trace.server": "off"
    "tremor-query.trace.server": "off"
```

## Development

For development, symlink the repo to `~/.vscode/extensions/`.

To compile edited typescript files to javascript, run: `npm run compile` from the repository root.

If you are using VS Code itself for editing the extension files, you can skip the above and just press `F5` to debug the extension: this will run `npm watch` task in the background to compile the code, and launch the extension in a new VS Code window.

Helpful links:

* https://code.visualstudio.com/api/language-extensions/overview
* https://code.visualstudio.com/api/language-extensions/language-server-extension-guide
* https://code.visualstudio.com/api/references/vscode-api
