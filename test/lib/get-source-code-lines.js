'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

test('reads, splits and escapes source', t => {
  const escapeJsonNode = sinon.mock().exactly(3)
    .onCall(0).returns('foo')
    .onCall(1).returns('bar')
    .onCall(2).returns('baz');

  const bundle = {
    generate: sinon.mock().resolves({ code: 'foo\nfoo\n\foo', exports: ['handler']})
  };

  const rollup = {
    rollup: sinon.mock().resolves(bundle)
  };

  const getSourceCodeLines = proxyquire('../../lib/get-source-code-lines', {
    'escape-json-node': escapeJsonNode,
    'rollup': rollup,
  });

  return getSourceCodeLines()
    .then(sourceCodeLines => {
      rollup.rollup.verify();
      escapeJsonNode.verify();

      t.true(sourceCodeLines[0] === 'foo');
      t.true(sourceCodeLines[1] === 'bar');
      t.true(sourceCodeLines[2] === 'baz');
    });
});

test('throws if it lacks module.exports.handler = ', t => {
  const escapeJsonNode = sinon.mock().exactly(2).onCall(0).returns('foo').onCall(1).returns('bar');

  const bundle = {
    generate: sinon.stub().resolves({ code: '', exports: []})
  };

  const rollup = {
    rollup: sinon.stub().resolves(bundle)
  };

  const getSourceCodeLines = proxyquire('../../lib/get-source-code-lines', {
    'escape-json-node': escapeJsonNode,
    'rollup': rollup,
  });

  return getSourceCodeLines() 
    .then(() => {
      t.fail('should not reach here');
    })
    .catch(err => {
      t.true(err.message === `missing 'module.exports.handler =' in source code`);
    });
});
