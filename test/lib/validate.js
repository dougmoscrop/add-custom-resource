'use strict';

const test = require('ava');

const validate = require('../../lib/validate');

test('throws when missing options', t => {
  const err = t.throws(() => {
    validate();
  });

  t.true(err.message === 'must specify options object to add custom resource');
});

test('throws when missing name', t => {
  const err = t.throws(() => {
    validate({});
  });

  t.true(err.message === 'must specify options.name for custom resource');
});

test('throws when missing sourceCodePath', t => {
  const err = t.throws(() => {
    validate({ name: 'test' });
  });

  t.true(err.message === 'must specify options.sourceCodePath for custom resource code');
});

test('passes when happy', t => {
  validate({ name: 'test', sourceCodePath: 'foo' });
  t.pass();
});
