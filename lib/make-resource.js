'use strict';

module.exports = function makeResource(name, functionId, logGroupId, resourceOptions) {
  const options = resourceOptions || {};
  const dependencies = options.dependencies ? [].concat(options.dependencies) : [];

  dependencies.push(functionId, logGroupId);

  return {
    Type: `Custom::${name}`,
    Properties: Object.assign({}, options.properties, {
      ServiceToken: {
        'Fn::GetAtt': [functionId, 'Arn']
      }
    }),
    DependsOn: dependencies
  };
};
