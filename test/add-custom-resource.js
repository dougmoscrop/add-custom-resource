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
  const getSourceCodeLines = sinon.mock().returns([]);
  const makeRole = sinon.mock();
  const makeResource = sinon.mock();
  const makeFunction = sinon.mock();
  const makeLogGroup = sinon.mock();

  const addCustomResource = proxyquire('../', {
    './lib/validate': validate,
    './lib/get-source-code-lines': getSourceCodeLines,
    './lib/make-role': makeRole,
    './lib/make-log-group': makeLogGroup,
    './lib/make-resource': makeResource,
    './lib/make-function': makeFunction,
  });

  addCustomResource({ Resources: {} }, {
    name: 'test'
  });

  validate.verify();
  getSourceCodeLines.verify();
  makeRole.verify();
  makeFunction.verify();
  makeResource.verify();
  makeLogGroup.verify();

  t.pass();
});

test('will only create one function, log group and role for multiple resources', t => {
  const validate = sinon.stub();
  const getSourceCodeLines = sinon.stub().returns([]);
  const makeRole = sinon.stub();
  const makeResource = sinon.stub();
  const makeFunction = sinon.stub();
  const makeLogGroup = sinon.stub();

  const addCustomResource = proxyquire('../', {
    './lib/validate': validate,
    './lib/get-source-code-lines': getSourceCodeLines,
    './lib/make-role': makeRole,
    './lib/make-log-group': makeLogGroup,
    './lib/make-resource': makeResource,
    './lib/make-function': makeFunction,
  });

  const Resources = {};

  addCustomResource({ Resources }, {
    name: 'Test',
    functionName: 'Test',
  });

  addCustomResource({ Resources }, {
    name: 'Test2',
    functionName: 'Test',
  });

  t.is(Object.keys(Resources).length, 5);
});