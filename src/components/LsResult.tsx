import React from 'react';
import FolderIcon from '../images/folder.svg';
import FileIcon from '../images/file.svg';
import PNGIcon from '../images/image.svg';
import { ItemListType } from '../';

interface LsResultProps {
  lsResult: ItemListType;
}

const LsResult: React.FC<LsResultProps> = (props): JSX.Element => {
  const { lsResult } = props;

  const lsItems = Object.keys(lsResult).map(
    (key): JSX.Element => {
      if (lsResult[key].type === 'FOLDER') {
        return (
          <li className="ls-folder" key={key}>
            <FolderIcon /> <span>{key}</span>
          </li>
        );
      } else if (lsResult[key].type === 'PNG') {
        return (
          <li className="ls-image" key={key}>
            <PNGIcon /> <span>{key}</span>
          </li>
        );
      }

      return (
        <li className="ls-file" key={key}>
          <FileIcon /> <span>{key}</span>
        </li>
      );
    },
  );

  return <ul className="terminal-ls-list">{lsItems}</ul>;
};

export default LsResult;
