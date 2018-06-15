'use strict';

const test = require('ava');

const makeLogGroup = require('../../lib/make-log-group');

test('returns the correct type', t => {
  t.deepEqual(makeLogGroup().Type, 'AWS::Logs::LogGroup');
});

test('sets the function name', t => {
  t.deepEqual(makeLogGroup('abc').Properties.LogGroupName['Fn::Join'][1][1].Ref, 'abc');
});

test('sets default retention', t => {
  t.deepEqual(makeLogGroup('abc').Properties.RetentionInDays, 1);
});

test('sets custom retention', t => {
  t.deepEqual(makeLogGroup('abc', 3).Properties.RetentionInDays, 3);
});

test('sets no retention', t => {
  t.deepEqual(makeLogGroup('abc', false).Properties.RetentionInDays, undefined);
});

test('references lambda name in log group name', t => {
  const logGroupName = makeLogGroup('abc', false).Properties.LogGroupName;
  
  t.deepEqual(logGroupName['Fn::Join'][1][1].Ref, 'abc');
});

test('has appropriate prefix in log group name', t => {
  const logGroupName = makeLogGroup('abc', false).Properties.LogGroupName;
  
  t.deepEqual(logGroupName['Fn::Join'][1][0], '/aws/lambda/');
});

test('has random suffix in log group name', t => {
  const logGroupName = makeLogGroup('abc', false).Properties.LogGroupName;
  
  t.deepEqual(typeof logGroupName['Fn::Join'][1][2], 'string');
});