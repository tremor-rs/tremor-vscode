"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const os_1 = require("os");
const vscode_languageclient_1 = require("vscode-languageclient");
let client;
function expandPathResolving(path) {
    if (path.startsWith('~/')) {
        return path.replace('~', os_1.homedir());
    }
    return path;
}
function activate(context) {
    const config = vscode_1.workspace.getConfiguration('TremorLanguageServer');
    let serverCommand = expandPathResolving("~/.cargo/bin/tremor-language-server");
    // The server is implemented in node
    if (config.has("tremorLspServerPath")) {
        serverCommand = expandPathResolving(config.get("tremorLspServerPath"));
    }
    console.log(serverCommand);
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    //let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    let commandOptions = { stdio: 'pipe', detached: false };
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions = {
        run: { command: serverCommand, options: commandOptions },
        debug: { command: serverCommand, options: commandOptions },
    };
    // Options to control the language client
    let clientOptions = {
        // Register the server for plain text documents
        documentSelector: [{ scheme: 'file', language: 'tremor' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc')
        },
    };
    // Create the language client and start the client.
    client = new vscode_languageclient_1.LanguageClient('TremorLanguageServer', 'Tremor Language Server', serverOptions, clientOptions);
    client.registerProposedFeatures();
    // Start the client. This will also launch the server
    client.start();
}
exports.activate = activate;
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map