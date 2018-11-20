'use strict';

const getSourceCodeLines = require('./lib/get-source-code-lines');

const makeRole = require('./lib/make-role');
const makeFunction = require('./lib/make-function');
const makeLogGroup = require('./lib/make-log-group');
const makeResource = require('./lib/make-resource');

const validate = require('./lib/validate');

function ensureFunctionResources(template, config) {
  const functionName = config.name;
  const functionId = `Custom${functionName}Function`;
  const logGroupId = `Custom${functionName}LogGroup`;
  const roleArn = config.roleArn;

  if (functionId in template.Resources) {
    return Promise.resolve(functionId);
  }

  return getSourceCodeLines(config.sourceCodePath)
    .then(sourceCodeLines => {
      if (roleArn) {
        template.Resources[functionId] = makeFunction(sourceCodeLines, roleArn, true);
      } else {
        const roleId = `Custom${functionName}Role`;

        template.Resources[roleId] = makeRole(config.role);
        template.Resources[functionId] = makeFunction(sourceCodeLines, roleId);
      }

      template.Resources[logGroupId] = makeLogGroup(functionId, config.logRetentionInDays);
      
      return functionId;
    });
}

module.exports = function addCustomResource(template, config) {
  validate(config);

  const resourceName = config.resourceName || config.name;
  const resourceId = `Custom${resourceName}Resource`;

  return ensureFunctionResources(template, config)
    .then(functionId => {
      template.Resources[resourceId] = makeResource(resourceName, functionId, config.resource);
    });
};
