'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

test('exports a function', t => {
  const addCustomResource = require('../');

  t.true(typeof addCustomResource === 'function');
});

test('calls appropriate methods', t => {
  const validate = sinon.mock();
  const addResource = sinon.mock().exactly(4);
  const getSourceCodeLines = sinon.mock().returns([]);
  const makeRole = sinon.mock();
  const makeResource = sinon.mock();
  const makeFunction = sinon.mock();
  const makeLogGroup = sinon.mock();

  const addCustomResource = proxyquire('../', {
    './lib/validate': validate,
    './lib/get-source-code-lines': getSourceCodeLines,
    './lib/add-resource': addResource,
    './lib/make-role': makeRole,
    './lib/make-log-group': makeLogGroup,
    './lib/make-resource': makeResource,
    './lib/make-function': makeFunction,
  });

  addCustomResource({ Resources: {} }, {
    name: 'test'
  });

  validate.verify();
  addResource.verify();
  getSourceCodeLines.verify();
  makeRole.verify();
  makeFunction.verify();
  makeResource.verify();
  makeLogGroup.verify();

  t.pass();
});
