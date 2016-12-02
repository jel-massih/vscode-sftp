'use strict';

import {
    commands,
    workspace,
    window,
    Uri
} from 'vscode';

import * as Path from 'path';
import * as fs from 'fs';

import {Display} from './Display';
import {Utils} from './Utils';

export const SFTP_CONFIG_FILENAME = 'vscode-sftp.json';

//Cache configs that we have already loaded from disk so that we dont have to constantly hit filesystem
var _loadedConfigs: { [configPath: string]: SFTPConfig.SFTPConfigMapping } = {}; 

export namespace SFTPConfig 
{
    function getConfigPath(startDirectory: string): string {
        return Utils.findNearestFile(SFTP_CONFIG_FILENAME, startDirectory);
    }

    //check if a sftp.config file exists anywhere in target folders directory and up (upto the workspace root)
    export function checkConfigExists(startDirectory: string) : boolean
    {
        var configFile = getConfigPath(startDirectory);

        return configFile !== null;
    }

    //Create config file if does not exist
    export function initConfigFile(initDirectory: string): boolean {
        //If config file already exists, dont recreate
        if(checkConfigExists(initDirectory)) {
            return false;
        }

        //Get object with default values
        var config = getConfig(initDirectory);
    }

    //Gets the config object for specified path
    export function getConfig(configDirectory: string) : SFTPConfigMapping {
        var configFilePath = getConfigPath(configDirectory);
        if(configFilePath == null) {
            return null;
        }

        //If this config is cached, then use that version
        if(_loadedConfigs[configFilePath] != null) {
            return _loadedConfigs[configFilePath];
        }

        //Load config from disk
        var mapping = new SFTPConfigMapping();
        if(mapping.loadFromFile(configFilePath)) {
            return mapping;
        } else {
            return null;
        }
    }

    export class SFTPConfigMapping 
    {
        public loadFromFile(configFilePath: string): boolean {
            if(configFilePath == null) {
                return null;
            }

            var configJSONBuffer = fs.readFileSync(configFilePath);
            if(configJSONBuffer != null)
            {
                var configJSON  = JSON.parse(configJSONBuffer.toString());
                for(var propName in configJSON) {
                    this[propName] = configJSON[propName];
                }
                _loadedConfigs[configFilePath] = this;
                return true;
            }

            return false;
        }
    }
}