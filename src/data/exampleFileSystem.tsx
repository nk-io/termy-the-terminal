import React from 'react';
import { FileSystem } from '../index';
import dogImg from '../../src/images/dog.png';

interface BlogPostProps {
  date: string;
  content: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  date,
  content,
}): JSX.Element => (
  <>
    <h3>{date}</h3>
    <p>{content}</p>
  </>
);

const exampleFileSystem: FileSystem = {
  home: {
    type: 'FOLDER',
    children: {
      user: {
        type: 'FOLDER',
        children: {
          test: {
            type: 'FOLDER',
            children: null,
          },
        },
      },
      videos: {
        type: 'FOLDER',
        children: {
          file2: {
            type: 'FILE',
            content: 'Contents of file 2',
            extension: 'txt',
          },
        },
      },
      dog: {
        type: 'PNG',
        content: dogImg,
        extension: 'png',
      },
      file1: {
        type: 'FILE',
        content: 'Contents of file 1',
        extension: 'txt',
      },
      file5: {
        type: 'FILE',
        content: 'Contents of file 5',
        extension: 'txt',
      },
    },
  },
  docs: {
    type: 'FOLDER',
    children: null,
  },
  file3: {
    type: 'FILE',
    content: 'Contents of file 3',
    extension: 'txt',
  },
  file4: {
    type: 'FILE',
    content: 'Contents of file 4',
    extension: 'txt',
  },
  blog: {
    type: 'FILE',
    content: <BlogPost date="3/22" content="Today is a good day" />,
    extension: 'txt',
  },
};

export default exampleFileSystem;
