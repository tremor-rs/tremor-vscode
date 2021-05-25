import * as vscode from 'vscode';
import * as path from 'path';
import * as assert from 'assert';

/**
 * Activates the extension on the given file
 */
export async function activate() {
	// The extensionId is `publisher.name` from package.json
	const ext = vscode.extensions.getExtension('tremorproject.tremor-language-features')!;
	await ext.activate();
}

export async function loadFile(docUri: vscode.Uri): Promise<[vscode.TextDocument, vscode.TextEditor]> {
	let doc = await vscode.workspace.openTextDocument(docUri);
	let editor = await vscode.window.showTextDocument(doc);
	await sleep(2000); // Wait for server activation
	return [doc, editor];
}

export async function loadTrickle(content: string): Promise<[vscode.TextDocument, vscode.TextEditor]> {

	let doc = await vscode.workspace.openTextDocument(getDocUri("empty.trickle"));
	let editor = await vscode.window.showTextDocument(doc);
	await setTestContent(editor, content);
	await sleep(2000); // Wait for server activation
	return [doc, editor];
}

export async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const getDocPath = (file: string) => {
	return path.resolve(__dirname, '../../../tests/fixtures', file);
};
export const getDocUri = (file: string) => {
	return vscode.Uri.file(getDocPath(file));
};

export async function setTestContent(editor: vscode.TextEditor, content: string): Promise<boolean> {
	const doc = editor.document;
	const all = new vscode.Range(
		doc.positionAt(0),
		doc.positionAt(doc.getText().length)
	);
	return editor.edit(eb => eb.replace(all, content));
}

export async function clearEditor(editor: vscode.TextEditor) {

	const doc = editor.document;
	const all = new vscode.Range(
		doc.positionAt(0),
		doc.positionAt(doc.getText().length)
	);
	return editor.edit(eb => eb.delete(all));
}


export function diagnostic(message: string, range: vscode.Range, severity: vscode.DiagnosticSeverity, source: string): vscode.Diagnostic {
	return {message, range, severity, source}
}

export function range(sLine: number, sChar: number, eLine: number, eChar: number): vscode.Range {
	const start = new vscode.Position(sLine, sChar);
	const end = new vscode.Position(eLine, eChar);
	return new vscode.Range(start, end);
}

export function assertDiagnostic(actual: vscode.Diagnostic, expected: vscode.Diagnostic) {
	assert.strictEqual(actual.message, expected.message);
	assert.deepStrictEqual(actual.range, expected.range);
	assert.strictEqual(actual.severity, expected.severity);
	assert.strictEqual(actual.source, expected.source);
}

export function assertDiagnostics(actual: vscode.Diagnostic[], expected: vscode.Diagnostic[]) {
	assert.strictEqual(actual.length, expected.length, `Expected: ${expected.map((x) => JSON.stringify(x))}, got ${actual.map((x) => JSON.stringify(x))}.`);
	expected.forEach((e, i) => {
		const a = actual[i];
		assertDiagnostic(a, e);
	})
}