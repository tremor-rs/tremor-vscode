# Tremor language support for VS Code

Adds support for [Tremor's](https://www.tremor.rs/) languages ([tremor-script](https://docs.tremor.rs/tremor-script/) and [tremor-query](https://docs.tremor.rs/tremor-query/)) to Visual Studio Code. Features:

* Syntax highlighting for *.tremor* (tremor-script) and *.trickle* (tremor-query) files
* Error squiggles (with hints for fixing, as applicable)
* Completion for tremor-script and tremor-query (aggregate) functions
* Hover documentation for functions
* Language configuration (autoclosing and surrounding pairs, comment toggling, bracket definition, etc.)

The rich integration features (error diagnostics and completion/hover support) are powered by the [Tremor Language Server](https://github.com/tremor-rs/tremor-language-server/) (Trill). To activate all the features, you will need to install it alongside the extension (instructions below).

For support, please file an [issue on the repo](https://github.com/tremor-rs/tremor-vscode/issues/new) or talk to us on [Slack](https://chat.tremor.rs). For more details on how you can contribute to this repo (and the [Tremor project](https://www.tremor.rs/) in general), see [CONTRIBUTING.md](CONTRIBUTING.md).


## Installation

### Language Server

First install the Rust compiler and cargo (Rust's package manager) via https://www.rustup.rs/. This is required currently to build and install the language server.

Now run `cargo install tremor-language-server`. This places the language server binary in `~/.cargo/bin/`, and by default, the extension is configured to pick it up from there.

### Extension

Install from [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=tremorproject.tremor-language-features), or by entering `ext install tremorproject.tremor-language-features` at the VS Code command palette `Ctrl`+`P`.


## Configuration

This extension provides options in VS Code's configuration settings (under `File > Preferences > Settings`). Available options, with their default values:

```json
{
    "tremor.languageServerExecutable": "~/.cargo/bin/tremor-language-server",
    "tremor.languageServerModulePath": "",
    "tremor-script.trace.server": "off",
    "tremor-query.trace.server": "off"
}
```

If you installed the language server binary somewhere outside the default cargo path, you will need to update `tremor.languageServerExecutable`.

The trace configuration controls logging of communication between VS Code and the language server, for each of the tremor languages. Acceptable values are: `"off"`, `"messages"`, `"verbose"`. Turning these on can be helpful during extension development/debugging (to see the log output, navigate to `View -> Output`, then select `Trill` entries from the output dropdown).


## Development

See [development.md](development.md).

## Publishing

See [publishing.md](publishing.md).
