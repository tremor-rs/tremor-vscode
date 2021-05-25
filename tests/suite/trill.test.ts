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

	test('Test diagnostics warning trickle', async () => {
		let [doc, _editor] = await loadTrickle(`
		define tumbling window my_win with
		  interval = core::datetime::with_milliseconds(100),
		  emit_empty_windows = true
		end;

		select {"all": aggr::win::collect_flattened(event)} from in[my_win] group by event.snot into out;`);
		let diagnostics = vscode.languages.getDiagnostics(doc.uri);
		assertDiagnostics(diagnostics, [
			diagnostic("Using `emit_empty_windows` without guard is potentially dangerous. Consider limiting the amount of groups maintained internally by using `max_groups` and/or `eviction_period`.", range(1, 2, 4, 5), vscode.DiagnosticSeverity.Warning, 'tremor-language-server'),
			diagnostic("Collect functions are very expensive memory wise, try avoiding them.", range(6, 17, 6, 52), vscode.DiagnosticSeverity.Warning, 'tremor-language-server')
		]);
	});
	
	test('No diagnostics trickle', async () => {
		let [doc, _editor] = await loadTrickle("select event from in into out;\n");
				
		let diagnostics = vscode.languages.getDiagnostics(doc.uri);
		
		assertDiagnostics(diagnostics, []);
	})
});