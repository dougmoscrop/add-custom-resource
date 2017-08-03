'use strict';

module.exports = function makeFunction(sourceCodeLines, roleName) {
  return {
    Type: 'AWS::Lambda::Function',
    Properties: {
        Runtime: 'nodejs6.10',
        Timeout: 60,
        Handler: 'index.handler',
        Role: {
          'Fn::GetAtt': [
            roleName,
            'Arn'
          ]
        },
        Code: {
          ZipFile: {
            'Fn::Join': [' ', sourceCodeLines]
          }
        },
      },
      DependsOn: [
        roleName
      ]
    };
};
