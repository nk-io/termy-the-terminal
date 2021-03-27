import React from 'react';
import { AutoCompleteResponse, CommandResponse, FileSystem } from '../index';

/**
 * Do nothing for pwd autocomplete
 */

function clear(): Promise<CommandResponse> {
  return new Promise((resolve): void => {
    resolve({
      commandResult: <></>,
    });
  });
}

function clearAutoComplete(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  _fileSystem: FileSystem,
  _currentPath: string,
  _target: string,
  /* eslint-enable @typescript-eslint/no-unused-vars */
): Promise<AutoCompleteResponse> {
  return new Promise((resolve): void => {
    resolve({
      commandResult: null,
    });
  });
}

export default {
  autoCompleteHandler: clearAutoComplete,
  description: 'Clears the console',
  handler: clear,
};
