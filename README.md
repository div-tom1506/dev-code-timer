# VS Code Dev Code Timer

## Overview

Dev Code Timer is a Visual Studio Code extension that helps developers track the time spent working on different files. It provides an interactive UI to view the total time spent on each file during a coding session.

## Features

- [x] Automatically tracks the time spent on each file.

- [x] Displays a detailed report.

- [x] Saves session data for future reference.

- [x] Works seamlessly in the background while you code.

## Installation

Clone the repository:
``` bash
git clone https://github.com/div-tom1506/dev-code-timer.git
cd dev-code-timer
```
Open the project in VS Code:
```
code .
```
Install dependencies and compile:
```
npm install
npm run compile
```
Run the extension in Development Mode:
Open the Debug Panel (`Ctrl + Shift + D`)
Select "Run Extension" and press F5
A new VS Code Extension Development Host window will open.

## Usage

Open any file in VS Code, and the extension will automatically start tracking time.

Run the command Dev Code Timer: Show Time Report from the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) to view the report.

The report displays a table with filenames and time spent in seconds.

## Commands

| Command | Description |
|---------|-------------|
| `Dev Code Timer: Show Time Report` | Opens a UI panel displaying tracked time per file. |


## Contributing

If you want to improve this extension:

Fork the repository

Create a new branch for your feature or fix

Submit a pull request with your changes

## License

This project is licensed under the MIT License.

## Enjoying the extension?

If you find this useful, feel free to star ⭐ the repository and contribute!