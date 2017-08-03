'use strict';

const test = require('ava');

const addResource = require('../../lib/add-resource');

test('throws if exists', t => {
  const err = t.throws(() => {
    addResource({ Resources: { foo: '1' }}, 'foo', {});
  });

  t.true(err.message === 'foo is already in template.Resources');
});

test('adds resource', t => {
  const template = { Resources: { foo: '1' }};

  addResource(template, 'bar', 2);

  t.true(Object.keys(template.Resources).length === 2);
  t.true('foo' in template.Resources)
  t.true('bar' in template.Resources);
  t.true(template.Resources.bar === 2);
});
