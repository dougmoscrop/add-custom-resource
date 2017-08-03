'use strict';

module.exports = function makeResource(name, functionName, resourceOptions) {
  const options = resourceOptions || {};
  const dependencies = options.dependencies ? [].concat(options.dependencies) : [];

  dependencies.push(functionName);

  return {
    Type: `Custom::${name}`,
    Properties: Object.assign({}, options.properties, {
      ServiceToken: {
        'Fn::GetAtt': [functionName, 'Arn']
      }
    }),
    DependsOn: dependencies
  };
};
