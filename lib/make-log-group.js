'use strict';

module.exports = function makeLogGroup(functionName) {
  return {
    Type: 'AWS::Logs::LogGroup',
    Properties: {
      LogGroupName: {
        'Fn::Join': ['', [
            '/aws/lambda',
            { Ref: functionName }
          ]
        ]
      }
    }
  };
};
