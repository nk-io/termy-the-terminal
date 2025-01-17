import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';

import { getBasePlugins } from './rollup.config';

export default (commandLineArgs) => {
  const targetFolder = commandLineArgs.configDocBuild ? 'docs' : 'dist';
  const config = {
    input: 'src/app.tsx',
    output: [
      {
        file: `${targetFolder}/app.js`,
        format: 'iife',
        sourcemap: true,
      },
    ],
    plugins: [
      ...getBasePlugins(targetFolder),
      commonjs({
        include: ['node_modules/**'],
        namedExports: {
          'node_modules/react/index.js': [
            'Children',
            'Component',
            'PropTypes',
            'createElement',
          ],
          'node_modules/react-dom/index.js': ['render'],
        },
      }),
      typescript({
        rollupCommonJSResolveHack: true,
        clean: true,
        tsconfigOverride: {
          compilerOptions: { declaration: false, sourceMap: true },
          include: ['src/index.tsx', './src/types.d.ts', 'src/app.tsx'],
        },
      }),
      copy({
        targets: [{ src: 'src/templates/index.html', dest: targetFolder }],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  };

  if (!commandLineArgs.configDocBuild) {
    config.plugins.push(serve(targetFolder));
  }

  return config;
};
