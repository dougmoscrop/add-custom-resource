'use strict';

module.exports = function makeRole(roleOptions) {
  const options = roleOptions || {};
  const policies = options.policies ? [].concat(options.policies) : [];

  policies.push({
    PolicyName: 'logging-permission',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Action: [
          'logs:CreateLogGroup',
          'logs:PutRetentionPolicy',
        ],
        Resource: {
          'Fn::Sub': `arn:aws:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:*:`
        }
      }, {
        Effect: 'Allow',
        Action: [
          'logs:CreateLogStream',
          'logs:PutLogEvents',
          'logs:DescribeLogStreams',
          'logs:GetLogEvents'
        ],
        Resource: {
          'Fn::Sub': `arn:aws:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:*:log-stream:*`
        }
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
