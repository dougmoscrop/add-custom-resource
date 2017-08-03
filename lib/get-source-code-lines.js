'use strict';

const fs = require('fs');

const escapeJson = require('escape-json-node');

module.exports = function getSourceCodeLines(sourceCodePath) {
  const fileContents = fs.readFileSync(sourceCodePath, 'utf8');
  const sourceCode = fileContents.toString().replace(/[\r\n]+/g, '\n');

  return sourceCode.split('\n').map(line => escapeJson(line));
};
