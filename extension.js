const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let sessionData = {};
let startTime = {};
const dataFilePath = path.join(__dirname, 'timeData.json');

function activate(context) {
	loadTimeData();

	vscode.window.showInformationMessage('Dev Code Timer Activated!');

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument(trackStartTime),
		vscode.workspace.onDidCloseTextDocument(trackEndTime),
		vscode.workspace.onDidSaveTextDocument(saveTimeData),
		vscode.commands.registerCommand('devCodeTimer.showTime', showTimeData)
	);
}

function trackStartTime(document) {
	const fileName = document.fileName;
	if (!startTime[fileName]) {
		startTime[fileName] = Date.now();
		console.log(`Tracking started for: ${fileName}`);
	}
}

function trackEndTime(document) {
	const fileName = document.fileName;
	if (startTime[fileName]) {
		const duration = (Date.now() - startTime[fileName]) / 1000;
		sessionData[fileName] = (sessionData[fileName] || 0) + duration;
		delete startTime[fileName];
		console.log(`Tracking ended for: ${fileName}, Time Spent: ${sessionData[fileName]} sec`);
		saveTimeData();
	}
}

function saveTimeData() {
	fs.writeFileSync(dataFilePath, JSON.stringify(sessionData, null, 2));
}

function loadTimeData() {
	if (fs.existsSync(dataFilePath)) {
		try {
			const rawData = fs.readFileSync(dataFilePath, 'utf-8');
			sessionData = rawData ? JSON.parse(rawData) : {};
		} catch (error) {
			console.error("Error reading time data:", error);
			sessionData = {};
		}
	} else {
		sessionData = {};
	}
}

function showTimeData() {
	loadTimeData();
	if (Object.keys(sessionData).length === 0) {
		vscode.window.showInformationMessage("No time tracked yet.");
		return;
	}

	const panel = vscode.window.createWebviewPanel(
		'devCodeTimer',
		'Dev Code Timer',
		vscode.ViewColumn.One,
		{ enableScripts: true }
	);

	let htmlContent = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; background-color: #1e1e1e; color: white; }
                h2 { color: #61dafb; text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; background: #252526; border-radius: 8px; overflow: hidden; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #444; }
                th { background-color: #007ACC; color: white; font-size: 16px; }
                td { color: #e8e8e8; font-size: 14px; }
                tr:hover { background-color: #333; }
                .container { max-width: 800px; margin: 0 auto; padding: 20px; border-radius: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Time Spent on Files</h2>
                <table>
                    <tr><th>File</th><th>Time Spent (seconds)</th></tr>`;

	for (const file in sessionData) {
		htmlContent += `<tr><td style="color: #61dafb;">${file}</td><td style="color: #FFD700;">${sessionData[file].toFixed(2)}</td></tr>`;
	}

	htmlContent += `</table></div></body></html>`;
	panel.webview.html = htmlContent;
}

function deactivate() {
	Object.keys(startTime).forEach(file => trackEndTime({ fileName: file }));
	saveTimeData();
}

module.exports = {
	activate,
	deactivate
};
