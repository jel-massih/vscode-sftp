'use strict';

import {
    commands,
    workspace,
    window,
    Uri
} from 'vscode';

import * as Path from 'path';

import {Display} from './Display';
import {SFTPConfig} from './SFTPConfig';

export namespace SFTPCommands 
{
    export function registerCommands() {
        commands.registerCommand('sftp.mapToRemote', mapToRemote);
        commands.registerCommand('sftp.syncToRemote', syncToRemote);
        commands.registerCommand('sftp.syncFromRemote', syncFromRemote);
        commands.registerCommand('sftp.syncBothWays', syncBothWays);
    }

    export function mapToRemote(localUri: Uri) {
        console.log(localUri);
    }

    export function syncToRemote(localUri: Uri) {
        SFTPConfig.checkConfigExists(localUri.fsPath);
    }

    export function syncFromRemote(localUri: Uri) {
    }

    export function syncBothWays(localUri: Uri) {
    }
}