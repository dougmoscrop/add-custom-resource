'use strict';

const { builtinModules } = require('module');

const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const ignore = require('rollup-plugin-ignore');

const escapeJson = require('escape-json-node');

module.exports = function getSourceCodeLines(sourceCodePath) {
  const inputOptions = {
    input: sourceCodePath,
    external: ['aws-sdk', 'cfn-response'],
    plugins: [
      commonjs(),
      resolve({
        module: true,
        main: true,
        jsnext: true,
        preferBuiltins: true,
      }),
      ignore(builtinModules)
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
        const sourceCode = code.toString().replace(/[\r\n]+/g, '\n');
        return sourceCode.split('\n').map(line => escapeJson(line));
      }

      throw new Error(`missing 'module.exports.handler =' in source code`);
    });
};
