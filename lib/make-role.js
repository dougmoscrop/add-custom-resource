'use strict';

module.exports = function makeRole(roleOptions) {
  const options = roleOptions || {};
  const policies = options.policies ? [].concat(options.policies) : [];

  policies.push({
    PolicyName: 'logs-permissions',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Action: [
          'logs:*'
        ],
        Resource: 'arn:aws:logs:*:*:*'
      }]
    }
  });

  return {
    Type: 'AWS::IAM::Role',
    Properties: {
      Path: '/',
      AssumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Effect: 'Allow',
          Principal: {
            Service: 'lambda.amazonaws.com'
          },
          Action: 'sts:AssumeRole'
        }]
      },
      Policies: policies
    }
  };
};
