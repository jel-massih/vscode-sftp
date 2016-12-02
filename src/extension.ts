'use strict';

import {
    ExtensionContext, 
    workspace,
    window
} from 'vscode';

import { SFTPCommands } from './SftpCommands';
import FileSystemListener from './FileSystemListener';

export function activate(ctx: ExtensionContext) : void {
    //Register all commands
    SFTPCommands.registerCommands();

    var config = workspace.getConfiguration('sftp');
    //FileSystemListener is used if we want to do any actions automatically on varius actions
    if(config['uploadOnFileSave'] || config['deleteOnFileDelete']) 
    {
        ctx.subscriptions.push(new FileSystemListener());
    }
}