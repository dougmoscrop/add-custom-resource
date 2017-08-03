'use strict';

const test = require('ava');

const makeRole = require('../../lib/make-role');

test('returns the correct type', t => {
  t.true(makeRole().Type === 'AWS::IAM::Role');
});

test('adds additional policies', t => {
  t.true(makeRole({ policies: { Foo: 'bar' } }).Properties.Policies.length === 2);
  t.true(makeRole({ policies: { Foo: 'bar' } }).Properties.Policies[0].Foo === 'bar');
});
