'use strict'

import {
    window,
    workspace,
    Disposable,
    FileSystemWatcher,
    TextDocument,
    TextDocumentChangeEvent,
    Uri
} from 'vscode';

import {Display} from './Display';

export default class FileSystemListener
{
    private _disposable: Disposable;
    private _watcher: FileSystemWatcher;

    constructor() {
        const subscriptions: Disposable[] = [];

        var config = workspace.getConfiguration('sftp');

        if(config) {
            if(config['uploadOnFileSave']) {
                workspace.onDidSaveTextDocument(this.onFileSaved, this, subscriptions);
            }

            if(config['uploadOnFileSave'] || config['deleteOnFileDelete']) {
                this._watcher = workspace.createFileSystemWatcher('**/*', false, true, false);

                if(config['uploadOnFileSave']) {
                    this._watcher.onDidCreate(this.onFileCreated, this, subscriptions);
                }

                if(config['deleteOnFileDelete']) {
                    this._watcher.onDidDelete(this.onFileDeleted, this, subscriptions);
                }
            }
        }

        this._disposable = Disposable.from.apply(this, subscriptions);
    }

    public dispose() {
        this._disposable.dispose();
    }

    private onFileSaved(doc: TextDocument) {
    }

    private onFileDeleted(uri: Uri) {
    }

    private onFileCreated(uri: Uri) {
    }
}