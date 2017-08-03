'use strict';

const test = require('ava');

const makeResource = require('../../lib/make-resource');

test('returns the correct type', t => {
  t.true(makeResource('Test').Type === 'Custom::Test');
});

test('sets the function name', t => {
  t.true(makeResource('test', 'foo').Properties.ServiceToken['Fn::GetAtt'][0] === 'foo');
});

test('depends on the function', t => {
  t.true(makeResource('test', 'foo').DependsOn[0] === 'foo');
});

test('adds custom properties', t => {
  t.true(makeResource('test', 'foo', { properties: { bar: 2 } }).Properties.bar === 2);
});

test('adds custom dependencies', t => {
  t.true(makeResource('test', 'foo', { dependencies: ['bar', 'baz'] }).DependsOn[0] === 'bar');
  t.true(makeResource('test', 'foo', { dependencies: ['bar', 'baz'] }).DependsOn[1] === 'baz');
});
