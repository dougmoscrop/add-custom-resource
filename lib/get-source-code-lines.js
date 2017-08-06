'use strict';

const fs = require('fs');

const escapeJson = require('escape-json-node');

module.exports = function getSourceCodeLines(sourceCodePath) {
  const fileContents = fs.readFileSync(sourceCodePath, 'utf8');
  const sourceCode = fileContents.toString().replace(/[\r\n]+/g, '\n');

  if (sourceCode.indexOf('module.exports.handler =') === -1) {
    throw new Error(`missing 'module.exports.handler =' in source code`);
  }

  return sourceCode.split('\n').map(line => escapeJson(line));
};
