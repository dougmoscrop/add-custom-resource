'use strict';

const test = require('ava');

const makeResource = require('../../lib/make-resource');

test('returns the correct type', t => {
  t.true(makeResource('Test').Type === 'Custom::Test');
});

test('sets the function name', t => {
  t.true(makeResource('test', 'functionId').Properties.ServiceToken['Fn::GetAtt'][0] === 'functionId');
});

test('depends on the function', t => {
  t.true(makeResource('test', 'functionId').DependsOn[0] === 'functionId');
});

test('depends on the log group', t => {
  t.true(makeResource('test', 'functionId', 'logGroupId').DependsOn[1] === 'logGroupId');
});

test('adds custom properties', t => {
  t.true(makeResource('test', 'functionId', 'logGroupId', { properties: { bar: 2 } }).Properties.bar === 2);
});

test('adds custom dependencies', t => {
  t.deepEqual(makeResource('test', 'functionId', 'logGroupId', { dependencies: ['bar', 'baz'] }).DependsOn, [
    'functionId',
    'logGroupId',
    'bar',
    'baz'
  ]);
});
