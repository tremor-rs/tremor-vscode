import * as path from 'path';
import * as fs from 'fs';

import { runTests } from 'vscode-test';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');
		
		// Minimum supported version.
		const jsonData = fs.readFileSync(path.join(extensionDevelopmentPath, 'package.json'));
		const json = JSON.parse(jsonData.toString());
		let minimalVersion: string = json.engines.vscode;
		if (minimalVersion.startsWith('^')) minimalVersion = minimalVersion.slice(1);
	

		// The path to the extension test script
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');

		//const trickle_fixture_path = path.resolve(__dirname, '../../tests/fixtures/trickle/query.trickle');

		//const tremor_script_fixture_path = path.resolve(__dirname, '../../tests/fixtures/tremor_script');

		const arg_min = {
			version: minimalVersion,
			extensionDevelopmentPath,
			extensionTestsPath,
			extensionsTestEnv: {
				'SHELL': '/bin/bash'
			},
			launchArgs: ['--disable-extensions']
		};

		const arg = { 
			version: 'stable', 
			extensionDevelopmentPath, 
			extensionTestsPath, 
			launchArgs: ['--disable-extensions'] 
		};
		// Download VS Code, unzip it and run the integration test
		console.log(arg_min);
		await runTests(arg_min);
		
		console.log(arg);
		await runTests(arg);

		
		//await runTests({ extensionDevelopmentPath, extensionTestsPath, launchArgs: ['--disable-extensions', tremor_script_fixture_path] });
	} catch (err) {
		console.error("Failed to run tests:", err);
		process.exit(1);
	}
}

main();