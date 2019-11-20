import * as path from 'path';
import { window, workspace, ExtensionContext } from 'vscode';
import { homedir } from 'os';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
    ExecutableOptions,
    Executable

} from 'vscode-languageclient';

let client: LanguageClient;


function expandPathResolving(path: string) {
    if (path.startsWith('~/')) {
        return path.replace('~', homedir());
    }
    return path;
}

export function activate(context: ExtensionContext) {
    const config = workspace.getConfiguration('TremorLanguageServer');

    let serverCommand = expandPathResolving("~/.cargo/bin/tremor-language-server")
    // The server is implemented in node
    if (config.has("tremorLspServerPath")) {
        serverCommand = expandPathResolving(config.get("tremorLspServerPath"))
    }
    console.log(serverCommand);
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    //let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    let commandOptions: ExecutableOptions = { stdio: 'pipe', detached: false };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions: ServerOptions = {
        run: <Executable>{ command: serverCommand, options: commandOptions },
        debug: <Executable>{ command: serverCommand, options: commandOptions },
    };

    // Options to control the language client
    let clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: [{ scheme: 'file', language: 'tremor' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
        },
    };

    // Create the language client and start the client.
    client = new LanguageClient(
        'TremorLanguageServer',
        'Tremor Language Server',
        serverOptions,
        clientOptions
    );

    client.registerProposedFeatures();
    // Start the client. This will also launch the server
    client.start();
}

export function deactivate(): Thenable<void> {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
