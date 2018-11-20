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
  const getSourceCodeLines = sinon.mock().resolves([]);
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

  const Resources = {};

  return addCustomResource({ Resources }, { name: 'test' })
    .then(() => {
      validate.verify();
      getSourceCodeLines.verify();
      makeRole.verify();
      makeFunction.verify();
      makeResource.verify();
      makeLogGroup.verify();

      t.is(Object.keys(Resources).length, 4);
    });
});

test('will only create one function, log group and role for multiple resources', t => {
  const validate = sinon.stub();
  const getSourceCodeLines = sinon.stub().resolves([]);
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

  return addCustomResource({ Resources }, { name: 'Test', resourceName: 'Test' })
    .then(() => {
      return addCustomResource({ Resources }, { name: 'Test', resourceName: 'Test2' });
    })
    .then(() => {
      t.is(Object.keys(Resources).length, 5);
    });
});

test('supports a roleArn', t => {
  const validate = sinon.mock();
  const getSourceCodeLines = sinon.mock().resolves([]);
  const makeRole = sinon.stub().throws();
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

  const Resources = {};

  return addCustomResource({ Resources }, { name: 'test', roleArn: 'foo' })
    .then(() => {
      validate.verify();
      getSourceCodeLines.verify();
      makeFunction.verify();
      makeResource.verify();
      makeLogGroup.verify();
    
      t.is(Object.keys(Resources).length, 3);
    });
});