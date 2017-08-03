'use strict';

const test = require('ava');

const makeLogGroup = require('../../lib/make-log-group');

test('returns the correct type', t => {
  t.true(makeLogGroup().Type === 'AWS::Logs::LogGroup');
});

test('sets the function name', t => {
  t.true(makeLogGroup('abc').Properties.LogGroupName['Fn::Join'][1][1].Ref === 'abc');
});
