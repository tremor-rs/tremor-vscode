import { workspace, ExtensionContext } from 'vscode';
import { homedir } from 'os';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    ExecutableOptions,
    Executable

} from 'vscode-languageclient/node';

const packageJSON = require('../../package.json');

let client: LanguageClient | undefined;

function expandPathResolving(path: string) {
    if (path.startsWith('~/')) {
        return path.replace('~', homedir());
    }
    return path;
}

function startTremorLanguageClient(language: string, path: string, serverCommand: string) {
    let commandArgs: string[] = [`--language=${language}`];
    if (path) {
        commandArgs.push(`--path=${path}`);
    }

    let commandOptions: ExecutableOptions = { detached: false };

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
        outputChannelName: 'Trill'
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

export async function activate(context: ExtensionContext) {
    const config = workspace.getConfiguration('tremor', context.extensionUri);

    let serverCommand = expandPathResolving(config.get('languageServerExecutable', '~/.cargo/bin/tremor-language-server'));
    let modulePath = config.get('languageServerModulePath', '');

    // TODO consider handling multiple languages from a single server process
    for (let language of packageJSON.contributes.languages) {
        startTremorLanguageClient(language.id, modulePath, serverCommand);
    }
}

export async function deactivate() {
    await client?.stop();
}
