import {
    window
} from 'vscode';

export namespace Display
{
    export var channel = window.createOutputChannel('Sftp Log');

    export function showError(error: string) {
        channel.show();
        channel.appendLine("ERROR:");
        channel.append(error);
    }
}
