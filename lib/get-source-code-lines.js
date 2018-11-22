'use strict';

const { builtinModules } = require('module');

const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

const escapeJson = require('escape-json-node');

module.exports = function getSourceCodeLines(sourceCodePath) {
  const inputOptions = {
    input: sourceCodePath,
    external: ['aws-sdk', 'cfn-response'].concat(builtinModules),
    plugins: [
      commonjs(),
      resolve({
        module: true,
        main: true,
        jsnext: true,
        preferBuiltins: true,
      }),
    ],
    onwarn (warning, warn) {
      if (warning.code === 'UNRESOLVED_IMPORT') {
        throw new Error(warning.message);
      }
      warn(warning);
    }
  };

  const outputOptions = {
    format: 'cjs',
    exports: 'named'
  };

  return rollup.rollup(inputOptions)
    .then(bundle => {
      return bundle.generate(outputOptions);
    })
    .then(result => {
      const { code, exports } = result; 

      if (exports.find(r => r === 'handler')) {    
        return code
          .toString()
          .replace(/[\r\n/]+/g, '\n')
          .split('\n')
          .map(line => escapeJson(line.replace(/^[\t\s]+/g, '')))
          .filter(line => line);
      }

      throw new Error(`missing 'module.exports.handler =' in source code`);
    });
};
