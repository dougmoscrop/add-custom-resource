'use strict';

module.exports = function makeLogGroup(functionId, retentionInDays) {
  const logGroup = {
    Type: 'AWS::Logs::LogGroup',
    Properties: {
      LogGroupName: {
        'Fn::Join': ['', [
            '/aws/lambda/',
            { Ref: functionId }
          ]
        ]
      }
    },
    DependsOn: [functionId]
  };

  const retention = retentionInDays === undefined ? 1 : retentionInDays

  if (retention) {
    logGroup.Properties.RetentionInDays = retention;
  }

  return logGroup;
};
