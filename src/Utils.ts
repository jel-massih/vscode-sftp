import * as CP from 'child_process';
import * as Path from 'path';
var findup = require("findup-sync");

export namespace Utils
{
    export function normalizePath(path: string): string
    {
        var normalizedPath = path;

        if (!this.pathIsUNC(normalizedPath)) {
            var replaceable = normalizedPath.split('\\');
            normalizedPath = replaceable.join('\\\\');
        }
        
        normalizedPath = "\"" + normalizedPath + "\"";
        return normalizedPath;
    }

    function pathIsUNC(path: string): boolean {
        return path.indexOf('\\\\') == 0;
    }

    //Find first file matching filename in workingDirectory or nearest ancestor
    export function findNearestFile(filename: string, workingDirectory: string): string
    {
        if(filename === "") {
            return null;
        }

        return findup(filename, {cwd: workingDirectory, nocase: true})
    }
}