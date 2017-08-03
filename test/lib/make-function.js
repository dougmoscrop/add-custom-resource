'use strict';

const test = require('ava');

const makeFunction = require('../../lib/make-function');

test('returns the correct type', t => {
  t.true( makeFunction().Type === 'AWS::Lambda::Function');
});

test('adds the soure code', t => {
  t.true(makeFunction(['abc']).Properties.Code.ZipFile['Fn::Join'][1][0] === 'abc');
});

test('adds DependsOn', t => {
  t.true(makeFunction([], 'test').DependsOn[0] === 'test');
});
