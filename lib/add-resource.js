'use strict';

module.exports = function addResource(template, name, resource) {
  if (name in template.Resources) {
    throw new Error(`${name} is already in template.Resources`);
  }
  template.Resources[name] = resource;
};
