'use strict';

const crypto = require('crypto');

module.exports = function makeLogGroup(functionName, retentionInDays) {
  const bytes = crypto.randomBytes(8);
  const suffix = bytes.toString('hex');
  
  const logGroup = {
    Type: 'AWS::Logs::LogGroup',
    Properties: {
      LogGroupName: {
        'Fn::Join': ['', [
            '/aws/lambda/',
            { Ref: functionName },
            '-',
            suffix
          ]
        ]
      }
    }
  };

  const retention = retentionInDays === undefined ? 1 : retentionInDays

  if (retention) {
    logGroup.Properties.RetentionInDays = retention;
  }

  return logGroup;
};
