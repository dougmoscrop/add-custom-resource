'use strict';

const getSourceCodeLines = require('./lib/get-source-code-lines');

const makeRole = require('./lib/make-role');
const makeFunction = require('./lib/make-function');
const makeLogGroup = require('./lib/make-log-group');
const makeResource = require('./lib/make-resource');

const validate = require('./lib/validate');

module.exports = function addCustomResource(template, config) {
  validate(config);

  const resourceName = config.name;
  const functionName = config.functionName || resourceName;

  const sourceCodeLines = getSourceCodeLines(config.sourceCodePath);

  const roleId = `Custom${functionName}Role`;
  const functionId = `Custom${functionName}Function`;
  const logGroupId = `Custom${functionName}LogGroup`;
  const resourceId = `Custom${resourceName}Resource`;

  template.Resources[roleId] = makeRole(config.role);
  template.Resources[functionId] = makeFunction(sourceCodeLines, roleId);
  template.Resources[logGroupId] = makeLogGroup(functionId, config.logRetentionInDays);
  template.Resources[resourceId] = makeResource(resourceName, functionId, config.resource);
};
