'use strict';

module.exports = function makeFunction(sourceCodeLines, role, isRoleArn) {
  return {
    Type: 'AWS::Lambda::Function',
    Properties: {
        Runtime: 'nodejs14.x',
        Timeout: 60,
        Handler: 'index.handler',
        Role: isRoleArn
          ? role
          : {
          'Fn::GetAtt': [
            role,
            'Arn'
          ]
        },
        Code: {
          ZipFile: {
            'Fn::Join': ['\n', sourceCodeLines]
          }
        },
      },
      DependsOn: isRoleArn
        ? []
        : [role]
    };
};
