'use strict';

module.exports = function validate(options) {
  if (!options) {
    throw new Error('must specify options object to add custom resource');
  }

  if (!options.name) {
    throw new Error('must specify options.name for custom resource');
  }

  if (!options.sourceCodePath) {
    throw new Error('must specify options.sourceCodePath for custom resource code');
  }
};
