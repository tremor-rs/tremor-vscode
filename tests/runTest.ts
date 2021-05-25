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

		const arg_min = {
			version: minimalVersion,
			extensionDevelopmentPath,
			extensionTestsPath,
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
		let res_min = await runTests(arg_min);
		if (res_min != 0) {
			process.exit(res_min);
		}
		
		console.log(arg);
		await runTests(arg)
	} catch (err) {
		console.error("Failed to run tests:", err);
		process.exit(1);
	}
}

main();