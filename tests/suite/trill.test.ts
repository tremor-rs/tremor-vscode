import * as vscode from 'vscode';
import { before } from 'mocha';
import { activate, loadTrickle, diagnostic, range, assertDiagnostics, clearEditor } from './helper';

suite('Tremor Language Server', () => {

	before(async () => {
		await activate();
	});
	test('Test diagnostics error trickle', async () => {
		let [doc, editor] = await loadTrickle("select event from in into;\n");
		let diagnostics = vscode.languages.getDiagnostics(doc.uri);
		assertDiagnostics(diagnostics, [
			diagnostic("Found the token `;` but expected `<ident>`", range(0, 25, 0, 26), vscode.DiagnosticSeverity.Error, 'tremor-language-server')
		]);
		clearEditor(editor);
	});

	test('No diagnostics trickle', async () => {
		let [doc, _editor] = await loadTrickle("select event from in into out;\n");

		let diagnostics = vscode.languages.getDiagnostics(doc.uri);

		assertDiagnostics(diagnostics, []);
	})
});