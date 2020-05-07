import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import { homedir } from 'os';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
    ExecutableOptions,
    Executable

} from 'vscode-languageclient';

const packageJSON = require('../../package.json');

let client: LanguageClient;

function expandPathResolving(path: string) {
    if (path.startsWith('~/')) {
        return path.replace('~', homedir());
    }
    return path;
}

function startTremorLanguageClient(language: string, path: string, serverCommand: string) {
    let commandArgs: string[] = [`--language=${language}`, `--path=${path}`];

    let commandOptions: ExecutableOptions = { stdio: 'pipe', detached: false };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    // TODO add debug flag to the server
    let serverOptions: ServerOptions = {
        run: <Executable>{ command: serverCommand, args: commandArgs, options: commandOptions },
        debug: <Executable>{ command: serverCommand, args: commandArgs, options: commandOptions },
    };

    // Options to control the language client
    let clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: [{ scheme: 'file', language: language }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
        },
    };

    // Create the language client and start the client.
    client = new LanguageClient(
        language,
        `Trill (${language})`,
        serverOptions,
        clientOptions
    );

    client.registerProposedFeatures();

    // Start the client. This will also launch the server
    client.start();
}

export function activate(context: ExtensionContext) {
    const config = workspace.getConfiguration('tremor');

    let serverCommand = expandPathResolving('~/.cargo/bin/tremor-language-server');
    if (config.has('languageServerExecutable')) {
        serverCommand = expandPathResolving(config.get('languageServerExecutable'));
    }
    let modulePath = '';
    if (config.has('languageServerModulePath')) {
        modulePath = config.get('languageServerModulePath');
    }

    // TODO consider handling multiple languages from a single server process
    for (let language of packageJSON.contributes.languages) {
      startTremorLanguageClient(language.id, modulePath, serverCommand);
    }
}

export function deactivate(): Thenable<void> {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
