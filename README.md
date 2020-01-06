#tremor-vscode

Visual Studio Code extension for tremor.

# Installation

```bash
npm install

sudo npm install -g vsce
vsce package

code --install-extension tremor-<version>.vsix
```

### Configuration

```json
    "tremor.languageServerExecutable": "~/.cargo/bin/tremor-language-server"
    "tremor-script.trace.server": "off"
    "tremor-query.trace.server": "off"
```

### Development

For development, symlink the repo to `~/.vscode/extensions/`.

Helpful links:

* https://code.visualstudio.com/api/language-extensions/language-server-extension-guide
* https://code.visualstudio.com/api/references/vscode-api
