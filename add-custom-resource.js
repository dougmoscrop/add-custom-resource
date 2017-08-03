'use strict';

const getSourceCodeLines = require('./lib/get-source-code-lines');

const makeRole = require('./lib/make-role');
const makeFunction = require('./lib/make-function');
const makeLogGroup = require('./lib/make-log-group');
const makeResource = require('./lib/make-resource');

const addResource = require('./lib/add-resource');

const validate = require('./lib/validate');

module.exports = function addCustomResource(template, config) {
  validate(config);

  const name = config.name;
  const sourceCodeLines = getSourceCodeLines(config.sourceCodePath);

  const roleName = `Custom${name}Role`;
  const functionName = `Custom${name}Function`;
  const logGroupName = `Custom${name}LogGroup`;
  const resourceName = `Custom${name}Resource`;

  addResource(template, roleName, makeRole(config.role));
  addResource(template, functionName, makeFunction(sourceCodeLines, roleName));
  addResource(template, logGroupName, makeLogGroup(functionName));
  addResource(template, resourceName, makeResource(name, functionName, config.resource));
};
