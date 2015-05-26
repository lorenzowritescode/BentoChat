'use strict';

describe('Wiki', function () {
  var React = require('react/addons');
  var Wiki, component;

  beforeEach(function () {
    Wiki = require('components/Wiki.js');
    component = React.createElement(Wiki);
  });

  it('should create a new instance of Wiki', function () {
    expect(component).toBeDefined();
  });
});
